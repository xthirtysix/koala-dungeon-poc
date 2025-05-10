<script setup lang="ts">
import { ObstacleCard } from '@/entities/obstacle'
import type { Obstacle } from '@/entities/obstacle'
import obstaclesApi from '../api/obstacles'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import {
    computed,
    onMounted,
    ref,
    watch,
    type ComponentPublicInstance,
} from 'vue'
import { useLoadingLabels } from '@/shared/composables'
import { LOADING_LABELS } from '@/pages/journal'

const PAGE_SIZE = 30
const currentPage = ref(1)
const total = ref(0)
const isLoading = ref(false)
const isLoadingMore = ref(false)
const error = ref<string | null>(null)
const obstacles = ref<Obstacle[]>([])
const pagination = ref()

const hasNextPage = computed(() => {
    if (!pagination.value) return false
    return pagination.value.page < pagination.value.pageCount
})

const fetchData = async (page = 1, append = false) => {
    if (isLoading.value || isLoadingMore.value) return
    if (page === 1) isLoading.value = true
    else isLoadingMore.value = true
    error.value = null
    try {
        const res = await obstaclesApi.fetchObstacles({
            page,
            pageSize: PAGE_SIZE,
        })
        if (append) {
            obstacles.value = [...obstacles.value, ...res.obstacles]
        } else {
            obstacles.value = res.obstacles
        }
        pagination.value = res.pagination
        total.value = res.pagination.total
        currentPage.value = page
    } catch (e: any) {
        error.value = e?.message || 'Ошибка загрузки'
    } finally {
        isLoading.value = false
        isLoadingMore.value = false
    }
}

onMounted(() => {
    fetchData(1)
})

const ITEMS_PER_ROW = 3
const rowsCount = computed(() =>
    Math.ceil(obstacles.value.length / ITEMS_PER_ROW),
)

const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)

const rowVirtualizerOptions = computed(() => ({
    count: rowsCount.value,
    estimateSize: () => 400,
    scrollMargin: parentOffsetRef.value,
}))

const rowVirtualizer = useWindowVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
const containerOffset = computed(() => {
    const firstItem = virtualRows.value[0]
    if (!firstItem) return 0
    return firstItem.start - rowVirtualizer.value.options.scrollMargin
})

const measureElement = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !(el instanceof HTMLElement)) return
    rowVirtualizer.value.measureElement(el)
}

const getRowItems = (rowIndex: number) => {
    const startIndex = rowIndex * ITEMS_PER_ROW
    return obstacles.value.slice(startIndex, startIndex + ITEMS_PER_ROW)
}

// Бесконечная прокрутка: следим за виртуальными рядами
watch(
    () => virtualRows.value,
    (rows) => {
        if (
            !rows?.length ||
            isLoadingMore.value ||
            isLoading.value ||
            !hasNextPage.value
        )
            return
        const lastVisibleIndex = rows[rows.length - 1]?.index
        if (typeof lastVisibleIndex !== 'number') return
        const totalRows = rowsCount.value
        // Если один из последних 3 рядов видим и есть следующая страница
        if (lastVisibleIndex >= totalRows - 3 && hasNextPage.value) {
            fetchData(currentPage.value + 1, true)
        }
    },
    { deep: true },
)

const { loadingLabel } = useLoadingLabels(LOADING_LABELS, isLoadingMore)
</script>

<template>
    <h1 class="kd-h1">Помехи</h1>

    <div
        v-if="isLoading"
        class="font-amatic py-8 text-center text-4xl font-bold"
    >
        Загрузка...
    </div>
    <div v-if="error" class="py-4 text-red-500">{{ error }}</div>
    <div v-else ref="parentRef" class="relative">
        <div
            :style="{
                height: `${totalSize}px`,
                width: '100%',
                position: 'relative',
                overflowAnchor: 'none',
            }"
        >
            <div
                :style="{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${containerOffset}px)`,
                }"
            >
                <div
                    v-for="virtualRow in virtualRows"
                    :key="String(virtualRow.key)"
                    :ref="measureElement"
                    :data-index="virtualRow.index"
                    class="transition-transform duration-200"
                >
                    <div
                        class="grid grid-cols-1 gap-4 py-3 md:grid-cols-3 lg:grid-cols-3"
                    >
                        <obstacle-card
                            v-for="obstacle in getRowItems(virtualRow.index)"
                            :key="obstacle.id"
                            :obstacle="obstacle"
                            :is-unlocked="!!obstacle.description"
                        />
                    </div>
                </div>
                <div
                    v-if="isLoadingMore"
                    class="font-amatic py-4 text-center text-2xl font-bold text-gray-500"
                >
                    {{ loadingLabel }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.prose :where(h2):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
    margin-bottom: 1rem;
}

.prose :where(p):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
    color: var(--tw-prose-body);
}

.dark
    .prose
    :where(p):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
    color: var(--tw-prose-body);
}
</style>
