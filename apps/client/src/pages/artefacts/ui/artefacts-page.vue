<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Artefact, fetchArtefacts } from '@/entities/artefact'
import { ArtefactCard } from '@/widgets/artefact-card'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { ComponentPublicInstance } from 'vue'

defineOptions({
    name: 'ArtefactsPage',
})

const PAGE_SIZE = 30
const currentPage = ref(1)
const total = ref(0)
const isLoading = ref(false)
const isLoadingMore = ref(false)
const error = ref<string | null>(null)
const artefacts = ref<Artefact[]>([])
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
        const res = await fetchArtefacts.fetch({
            page,
            pageSize: PAGE_SIZE,
        })
        if (append) {
            artefacts.value = [...artefacts.value, ...res.artefacts]
        } else {
            artefacts.value = res.artefacts
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

const rowsCount = computed(() => Math.ceil(artefacts.value.length / ITEMS_PER_ROW))

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
    return artefacts.value.slice(startIndex, startIndex + ITEMS_PER_ROW)
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

const loadingMessages = [
    'Колдуем новые артефакты из воздуха...',
    'Ищем древние артефакты в пыльных сундуках...',
    'Призываем артефакты из параллельной вселенной...',
    'Собираем артефакты по кусочкам...',
    'Археологи уже бегут с новыми находками!'
]

const currentLoadingMessage = ref(loadingMessages[0])

watch(isLoadingMore, (val) => {
    if (val) {
        const idx = Math.floor(Math.random() * loadingMessages.length)
        currentLoadingMessage.value = loadingMessages[idx]
    }
})
</script>

<template>
    <h1 class="kd-h1">Артефакты</h1>
    <div v-if="isLoading" class="text-center text-2xl font-amatic py-10">Загрузка...</div>
    <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>
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
                    transform: `translateY(${containerOffset}px)`
                }"
            >
                <div
                    v-for="virtualRow in virtualRows"
                    :key="String(virtualRow.key)"
                    :ref="measureElement"
                    :data-index="virtualRow.index"
                    class="transition-transform duration-200"
                >
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-3">
                        <ArtefactCard
                            v-for="artefact in getRowItems(virtualRow.index)"
                            :key="artefact.id"
                            :artefact="artefact"
                        />
                    </div>
                </div>
                <div
                    v-if="isLoadingMore"
                    class="py-4 text-center font-amatic font-bold text-2xl text-gray-500"
                >
                    {{ currentLoadingMessage }}
                </div>
            </div>
        </div>
    </div>
</template>
