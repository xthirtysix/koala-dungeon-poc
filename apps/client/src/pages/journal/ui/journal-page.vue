<script setup lang="ts">
import { computed } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { type JournalEntry } from '@/entities/journal'
import { JournalList } from '@/widgets/journal'
import { useJournal } from '../api/journal-page.loader'
import { journalPageQueryOptions } from '../api/journal-page.query'
import JournalPageSkeleton from './journal-page-skeleton.vue'
import JournalListSkeleton from './journal-list-skeleton.vue'
import { SKELETON_COUNT } from '../consts/journal-page.consts'
useJournal()

const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
} = useInfiniteQuery(journalPageQueryOptions())

const allEntries = computed<JournalEntry[]>(
    () => data.value?.pages.flatMap((page) => page.data) ?? [],
)

function onLoadMore() {
    if (!hasNextPage.value || isFetchingNextPage.value || isFetching.value) {
        return
    }

    fetchNextPage()
}
</script>

<template>
    <journal-page-skeleton v-if="isFetching && !isFetchingNextPage" />

    <template v-else>
        <h1 class="kd-h1">Журнал событий</h1>
        <p class="mb-5">
            В подземелье могут происходить различные события, которые влияют на
            ход игры и создают уникальные ситуации.
        </p>
        <div v-if="error" class="py-10 text-center text-red-500">
            {{ error }}
        </div>

        <journal-list
            v-else
            class="mb-4 block"
            :entries="allEntries"
            @load-more="onLoadMore"
        />

        <journal-list-skeleton
            v-if="isFetchingNextPage"
            :count="SKELETON_COUNT"
            class="-mt-30"
        />
    </template>
</template>
