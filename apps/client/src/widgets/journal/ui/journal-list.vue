<script setup lang="ts">
import { computed, type ComponentPublicInstance, watch } from 'vue'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import { type JournalEntry } from '@/entities/journal'
import { JournalEntry as JournalEntryComponent } from '@/widgets/journal'

const { entries } = defineProps<{
    entries: JournalEntry[]
}>()

const emit = defineEmits<{
    (e: 'load-more'): void
}>()

const SCROLL_MARGIN = 233
const PADDING_END = 85

const virtualizerOptions = computed(() => ({
    count: entries.length,
    estimateSize: () => 64,
    overscan: 5,
    scrollMargin: SCROLL_MARGIN,
    gap: 16,
    paddingEnd: PADDING_END,
}))

const virtualizer = useWindowVirtualizer(virtualizerOptions)
const virtualItems = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())
const containerOffset = computed(() => {
    const firstItem = virtualItems.value[0]
    if (!firstItem) return 0
    return firstItem.start - SCROLL_MARGIN
})

const getEntry = (index: number): JournalEntry | null => {
    return entries[index] ?? null
}

const measureElement = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !(el instanceof HTMLElement)) return
    virtualizer.value.measureElement(el)
}

watch(
    () => virtualItems.value,
    (items) => {
        if (!items?.length) return

        const lastVisibleIndex = items[items.length - 1]?.index

        if (typeof lastVisibleIndex !== 'number') return

        if (lastVisibleIndex >= entries.length - 5) {
            emit('load-more')
        }
    },
)
</script>

<template>
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
                <ul>
                    <li
                        v-for="virtualItem in virtualItems"
                        :key="`virtual-${virtualItem.index}`"
                        :ref="measureElement"
                        :data-index="virtualItem.index"
                    >
                        <template v-if="getEntry(virtualItem.index)">
                            <div
                                v-if="
                                    virtualItem.index === 0 ||
                                    getEntry(virtualItem.index)
                                        ?.marathon_day !==
                                        getEntry(virtualItem.index - 1)
                                            ?.marathon_day
                                "
                                class="mb-4 flex items-center gap-2"
                            >
                                <h2 class="text-2xl font-semibold">
                                    День
                                    {{
                                        getEntry(virtualItem.index)
                                            ?.marathon_day
                                    }}
                                </h2>
                            </div>
                            <journal-entry-component
                                v-if="getEntry(virtualItem.index)"
                                :entry="
                                    getEntry(virtualItem.index) as JournalEntry
                                "
                                class="mb-4"
                            />
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
