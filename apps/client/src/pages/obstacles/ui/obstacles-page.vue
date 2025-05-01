<script setup lang="ts">
import {
    ObstacleCard,
    useObstacles,
    obstacles as mockedObstacles,
} from '@/entities/obstacle'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { ComponentPublicInstance } from 'vue'

defineOptions({
    name: 'ObstaclesPage',
})

const { selectedType, onlyUnlocked, filteredObstacles, typeOptions } =
    useObstacles({
        data: mockedObstacles,
    })

const ITEMS_PER_ROW = 3
const rowsCount = computed(() => Math.ceil(filteredObstacles.value.length / ITEMS_PER_ROW))

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
    return filteredObstacles.value.slice(startIndex, startIndex + ITEMS_PER_ROW)
}

onMounted(() => {
    parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})
</script>

<template>
    <h1 class="kd-h1">Помехи</h1>

    <!-- Фильтр по типу -->
    <div class="flex items-center gap-4 mb-6">
        <u-select-menu
            v-model="selectedType"
            :items="typeOptions"
            multiple
            placeholder="Выберите тип помехи"
            class="w-full md:w-64"
        />
        <u-checkbox v-model="onlyUnlocked" label="Только открытые" />
    </div>

    <!-- Список помех -->
    <div ref="parentRef" class="relative">
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
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3">
                        <obstacle-card
                            v-for="obstacle in getRowItems(virtualRow.index)"
                            :key="obstacle.id"
                            :obstacle="obstacle"
                            :is-unlocked="!!obstacle.description"
                        />
                    </div>
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
