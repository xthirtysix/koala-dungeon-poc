<script setup lang="ts">
import { type JournalEntry, journalApi } from '@/entities/journal'
import { JournalEntry as JournalEntryComponent } from '@/widgets/journal'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import {
    type ComponentPublicInstance,
    ref,
    computed,
    onMounted,
    watch,
    shallowRef,
} from 'vue'

const PAGE_SIZE = 50
const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)
const hasNextPage = ref(true)
const allEntries = shallowRef<JournalEntry[]>([])

const virtualizerOptions = computed(() => ({
    count: allEntries.value.length,
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
    return allEntries.value[index] ?? null
}

const loadPage = async (page: number) => {
    if (isLoading.value || !hasNextPage.value) return

    isLoading.value = true
    try {
        const { entries, pagination } = await journalApi.fetchEntries({
            page,
            pageSize: PAGE_SIZE,
        })

        allEntries.value = [...allEntries.value, ...entries]
        hasNextPage.value = pagination.total > page * PAGE_SIZE
        currentPage.value = page
    } finally {
        isLoading.value = false
    }
}

const measureElement = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !(el instanceof HTMLElement)) return
    virtualizer.value.measureElement(el)
}

// Проверка необходимости подгрузки следующей страницы
watch(
    () => virtualItems.value,
    (items) => {
        if (!items?.length) return

        const lastVisibleIndex = items[items.length - 1]?.index
        if (typeof lastVisibleIndex !== 'number') return

        const totalItems = allEntries.value.length

        // Если один из последних 5 элементов видим и есть следующая страница
        if (
            lastVisibleIndex >= totalItems - 5 &&
            hasNextPage.value &&
            !isLoading.value
        ) {
            loadPage(currentPage.value + 1)
        }
    },
    { deep: true },
)

onMounted(async () => {
    await loadPage(1)
    parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})
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
            <ul
                :style="{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${containerOffset}px)`,
                }"
            >
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
                                getEntry(virtualItem.index)?.marathon_day !==
                                    getEntry(virtualItem.index - 1)
                                        ?.marathon_day
                            "
                            class="flex items-center gap-3 mb-4"
                        >
                            <h2 class="text-lg font-semibold">
                                День
                                {{ getEntry(virtualItem.index)?.marathon_day }}
                            </h2>
                        </div>
                        <journal-entry-component
                            v-if="getEntry(virtualItem.index)"
                            :entry="getEntry(virtualItem.index) as JournalEntry"
                        />
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>
