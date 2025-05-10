<script setup lang="ts">
import { type JournalEntry } from '@/entities/journal'
import { JournalEntry as JournalEntryComponent } from '@/widgets/journal'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import { ref, computed, type ComponentPublicInstance, watch } from 'vue'

const { entries, isLoadingMore, loadingLabel } = defineProps<{
    entries: JournalEntry[]
    isLoadingMore: boolean
    loadingLabel: string
}>()

const emit = defineEmits<{
    (e: 'load-more'): void
}>()

const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)

const virtualizerOptions = computed(() => ({
    count: entries.length,
    estimateSize: () => 80,
    overscan: 5,
    scrollMargin: parentOffsetRef.value,
}))

const virtualizer = useWindowVirtualizer(virtualizerOptions)
const virtualItems = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())
const containerOffset = computed(() => {
    const firstItem = virtualItems.value[0]
    if (!firstItem) return 0
    return firstItem.start - virtualizer.value.options.scrollMargin
})

const getEntry = (index: number): JournalEntry | null => {
    return entries[index] ?? null
}

const measureElement = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !(el instanceof HTMLElement)) return
    virtualizer.value.measureElement(el)
}

// Эмитим событие, если последний видимый элемент — один из последних 5
watch(
    () => virtualItems.value,
    (items) => {
        if (!items?.length) return
        const lastVisibleIndex = items[items.length - 1]?.index
        if (typeof lastVisibleIndex !== 'number') return
        if (lastVisibleIndex >= entries.length - 5 && !isLoadingMore) {
            emit('load-more')
        }
    },
    { deep: true },
)
</script>

<template>
    <div ref="parentRef" class="relative pb-32">
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
                        class="mb-4 [&:last-child]:mb-8"
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
                                class="mb-4 flex items-center gap-3"
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
                            />
                        </template>
                    </li>
                </ul>
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
