<script setup lang="ts">
import { ref, computed, watch, type ComponentPublicInstance } from 'vue'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { ArtefactCard } from '@/widgets/artefact-card'
import { Artefact } from '@/entities/artefact'
import { AdvertisingBanner } from '@/entities/banner'
import { usePageBanner } from '@/entities/banner/model/usePageBanner'
import { PageName } from '@/shared/config'
import { useArtefacts } from '../api/artefacts-page.loader'
import { artefactsPageQueryOptions } from '../api/artefacts-page.query'
import ArtefactsPageSkeleton from './artefacts-page-skeleton.vue'
import ArtefactsGridSkeleton from './artefacts-grid-skeleton.vue'
import { SKELETON_COUNT } from '../consts/artefacts-page.consts'

const ITEMS_PER_ROW = 3

defineOptions({
    name: 'ArtefactsPage',
})

useArtefacts()

const { pageBanner: artefactsBanner } = usePageBanner(PageName.ARTEFACTS)

const {
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
} = useInfiniteQuery(artefactsPageQueryOptions())


const parentOffsetRef = ref(0)

const artefacts = computed<Artefact[]>(() => {
    return data.value?.pages.flatMap((page) => page.data) ?? []
})

const rowsCount = computed(() =>
    Math.ceil(artefacts.value.length / ITEMS_PER_ROW),
)

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

function measureElement(el: Element | ComponentPublicInstance | null) {
    if (!el || !(el instanceof HTMLElement)) return
    rowVirtualizer.value.measureElement(el)
}

function getRowItems(rowIndex: number) {
    const startIndex = rowIndex * ITEMS_PER_ROW
    return artefacts.value.slice(startIndex, startIndex + ITEMS_PER_ROW)
}

watch(
    () => virtualRows.value,
    (rows) => {
        if (
            !rows?.length ||
            isFetchingNextPage.value ||
            isFetching.value ||
            !hasNextPage.value
        ) {
            return
        }

        const lastVisibleIndex = rows[rows.length - 1]?.index

        if (typeof lastVisibleIndex !== 'number') return

        const totalRows = rowsCount.value

        if (lastVisibleIndex >= totalRows - 3 && hasNextPage.value) {
            fetchNextPage()
        }
    },
)
</script>

<template>
    <advertising-banner
        v-if="artefactsBanner"
        :banner="artefactsBanner"
        class="mb-10"
    />

    <artefacts-page-skeleton v-if="isFetching && !isFetchingNextPage" />

    <template v-else>
        <h1 class="kd-h1">Артефакты</h1>
        <div v-if="error" class="py-10 text-center text-red-500">
            {{ error }}
        </div>
        <div v-else class="relative">
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
                            class="grid grid-cols-1 gap-10 py-5 md:grid-cols-3"
                        >
                            <artefact-card
                                v-for="artefact in getRowItems(
                                    virtualRow.index,
                                )"
                                :key="artefact.id"
                                :artefact="artefact"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <artefacts-grid-skeleton v-if="isFetchingNextPage" :count="SKELETON_COUNT" class="mt-4" />
        </div>
    </template>
</template>
