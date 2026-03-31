<script setup lang="ts">
import {
    computed,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    watch,
    type ComponentPublicInstance,
} from 'vue'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import { obstaclesApi, LOADING_LABELS } from '@/entities/obstacle'
import { type Obstacle, ObstacleCard } from '@/entities/obstacle'
import { useLoadingLabels } from '@/shared/composables'

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
        const res = await obstaclesApi.getObstacles({
            page,
            pageSize: PAGE_SIZE,
        })
        if (append) {
            obstacles.value = [...obstacles.value, ...res.data]
        } else {
            obstacles.value = res.data
        }
        pagination.value = res.meta.pagination
        total.value = res.meta.pagination.total
        currentPage.value = page
    } catch (e: any) {
        error.value = e?.message || 'Ошибка загрузки'
    } finally {
        isLoading.value = false
        isLoadingMore.value = false
    }
}

const ITEMS_PER_ROW = 3

const unlockedObstacles = computed(() =>
    obstacles.value.filter((o) => o.isUnlocked),
)
const lockedObstacles = computed(() =>
    obstacles.value.filter((o) => !o.isUnlocked),
)

const chunkRows = (list: Obstacle[]) => {
    const chunks: Obstacle[][] = []
    for (let i = 0; i < list.length; i += ITEMS_PER_ROW) {
        chunks.push(list.slice(i, i + ITEMS_PER_ROW))
    }
    return chunks
}

const unlockedRowChunks = computed(() => chunkRows(unlockedObstacles.value))
const lockedRowChunks = computed(() => chunkRows(lockedObstacles.value))

const unlockedRowsCount = computed(() => unlockedRowChunks.value.length)
const lockedRowsCount = computed(() => lockedRowChunks.value.length)

const unlockedListAnchorRef = ref<HTMLElement | null>(null)
const lockedListAnchorRef = ref<HTMLElement | null>(null)
const scrollMarginUnlocked = ref(0)
const scrollMarginLocked = ref(0)

const updateScrollMargins = () => {
    if (typeof window === 'undefined') return
    const u = unlockedListAnchorRef.value
    const l = lockedListAnchorRef.value
    if (u) {
        scrollMarginUnlocked.value =
            u.getBoundingClientRect().top + window.scrollY
    }
    if (l) {
        scrollMarginLocked.value =
            l.getBoundingClientRect().top + window.scrollY
    }
}

const scheduleScrollMarginsUpdate = () => {
    nextTick(() => {
        requestAnimationFrame(updateScrollMargins)
    })
}

onMounted(() => {
    fetchData(1)
    window.addEventListener('resize', updateScrollMargins)
    scheduleScrollMarginsUpdate()
})

onUnmounted(() => {
    window.removeEventListener('resize', updateScrollMargins)
})

watch(
    () => [obstacles.value, isLoading.value] as const,
    () => {
        scheduleScrollMarginsUpdate()
    },
    { deep: true },
)

const unlockedVirtualizerOptions = computed(() => ({
    count: unlockedRowsCount.value,
    estimateSize: () => 400,
    scrollMargin: scrollMarginUnlocked.value,
}))

const lockedVirtualizerOptions = computed(() => ({
    count: lockedRowsCount.value,
    estimateSize: () => 400,
    scrollMargin: scrollMarginLocked.value,
}))

const unlockedVirtualizer = useWindowVirtualizer(unlockedVirtualizerOptions)
const lockedVirtualizer = useWindowVirtualizer(lockedVirtualizerOptions)

const unlockedVirtualRows = computed(() =>
    unlockedVirtualizer.value.getVirtualItems(),
)
const lockedVirtualRows = computed(() =>
    lockedVirtualizer.value.getVirtualItems(),
)

const unlockedTotalSize = computed(() =>
    unlockedVirtualizer.value.getTotalSize(),
)
const lockedTotalSize = computed(() => lockedVirtualizer.value.getTotalSize())

const unlockedContainerOffset = computed(() => {
    const firstItem = unlockedVirtualRows.value[0]
    if (!firstItem) return 0
    return (
        firstItem.start - unlockedVirtualizer.value.options.scrollMargin
    )
})

const lockedContainerOffset = computed(() => {
    const firstItem = lockedVirtualRows.value[0]
    if (!firstItem) return 0
    return firstItem.start - lockedVirtualizer.value.options.scrollMargin
})

const measureUnlocked = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !(el instanceof HTMLElement)) return
    unlockedVirtualizer.value.measureElement(el)
}

const measureLocked = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !(el instanceof HTMLElement)) return
    lockedVirtualizer.value.measureElement(el)
}

const trailingVirtualRows = computed(() =>
    lockedRowsCount.value > 0
        ? lockedVirtualRows.value
        : unlockedVirtualRows.value,
)

const trailingRowsCount = computed(() =>
    lockedRowsCount.value > 0
        ? lockedRowsCount.value
        : unlockedRowsCount.value,
)

watch(
    () => trailingVirtualRows.value,
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
        const totalRows = trailingRowsCount.value
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
    <div v-else class="relative">
        <h2  v-if="unlockedRowsCount > 0" class="kd-h2 font-amatic text-3xl font-bold first:pt-0">
            Открытые
        </h2>
        <div v-if="unlockedRowsCount > 0" ref="unlockedListAnchorRef" class="relative mb-[5rem]">
            <div
                :style="{
                    height: `${unlockedTotalSize}px`,
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
                        transform: `translateY(${unlockedContainerOffset}px)`,
                    }"
                >
                    <div
                        v-for="virtualRow in unlockedVirtualRows"
                        :key="`u-${String(virtualRow.key)}`"
                        :ref="measureUnlocked"
                        :data-index="virtualRow.index"
                        class="transition-transform duration-200"
                    >
                        <div
                            class="grid grid-cols-1 gap-10 py-5 md:grid-cols-3 lg:grid-cols-3"
                        >
                            <obstacle-card
                                v-for="obstacle in unlockedRowChunks[
                                    virtualRow.index
                                ] ?? []"
                                :key="obstacle.id"
                                :obstacle="obstacle"
                                :is-unlocked="obstacle.isUnlocked"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h2
            v-if="lockedRowsCount > 0"
            class="kd-h2 font-amatic text-3xl font-bold"
        >
            Скрытые
        </h2>
        <div ref="lockedListAnchorRef" class="relative">
            <div
                :style="{
                    height: `${lockedTotalSize}px`,
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
                        transform: `translateY(${lockedContainerOffset}px)`,
                    }"
                >
                    <div
                        v-for="virtualRow in lockedVirtualRows"
                        :key="`l-${String(virtualRow.key)}`"
                        :ref="measureLocked"
                        :data-index="virtualRow.index"
                        class="transition-transform duration-200"
                    >
                        <div
                            class="grid grid-cols-1 gap-10 py-5 md:grid-cols-3 lg:grid-cols-3"
                        >
                            <obstacle-card
                                v-for="obstacle in lockedRowChunks[
                                    virtualRow.index
                                ] ?? []"
                                :key="obstacle.id"
                                :obstacle="obstacle"
                                :is-unlocked="obstacle.isUnlocked"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="isLoadingMore"
            class="font-amatic py-4 text-center text-2xl font-bold text-gray-500"
        >
            {{ loadingLabel }}
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
