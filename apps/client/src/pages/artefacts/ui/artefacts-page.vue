<script setup lang="ts">
import { artefacts } from '@/entities/artefact'
import { ArtefactCard } from '@/widgets/artefact-card'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { ComponentPublicInstance } from 'vue'

defineOptions({
    name: 'ArtefactsPage',
})

const ITEMS_PER_ROW = 3
const rowsCount = Math.ceil(artefacts.length / ITEMS_PER_ROW)

const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)

const rowVirtualizerOptions = computed(() => ({
    count: rowsCount,
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
    return artefacts.slice(startIndex, startIndex + ITEMS_PER_ROW)
}

onMounted(() => {
    parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})
</script>

<template>
    <h1 class="kd-h1">Артефакты</h1>

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
                    <div class="grid grid-cols-3 gap-6 py-3">
                        <ArtefactCard
                            v-for="artefact in getRowItems(virtualRow.index)"
                            :key="artefact.id"
                            :artefact="artefact"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
