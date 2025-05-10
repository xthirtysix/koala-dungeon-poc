<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import { type JournalEntry, journalApi } from '@/entities/journal'
import { JournalList } from '@/widgets/journal'
import { useLoadingLabels } from '@/shared/composables'
import { LOADING_LABELS } from '@/pages/journal'

const PAGE_SIZE = 50
const currentPage = ref(1)
const isLoading = ref(false)
const isLoadingMore = ref(false)
const hasNextPage = ref(true)
const allEntries = shallowRef<JournalEntry[]>([])
const error = ref<string | null>(null)

const loadPage = async (page: number, append = false) => {
    if (isLoading.value || isLoadingMore.value || !hasNextPage.value) return

    if (page === 1) isLoading.value = true
    else isLoadingMore.value = true
    error.value = null
    try {
        const { entries, pagination } = await journalApi.fetchEntries({
            page,
            pageSize: PAGE_SIZE,
        })

        if (append) {
            allEntries.value = [...allEntries.value, ...entries]
        } else {
            allEntries.value = entries
        }
        hasNextPage.value = pagination.total > page * PAGE_SIZE
        currentPage.value = page
    } catch (e: any) {
        error.value = 'Ошибка загрузки'
    } finally {
        isLoading.value = false
        isLoadingMore.value = false
    }
}

const { loadingLabel } = useLoadingLabels(LOADING_LABELS, isLoadingMore)

onMounted(async () => {
    await loadPage(1)
})
</script>

<template>
    <h1 class="kd-h1">Журнал событий</h1>
    <p class="mb-5">
        В подземелье могут происходить различные события, которые влияют на ход
        игры и создают уникальные ситуации.
    </p>
    <div
        v-if="isLoading"
        class="font-amatic py-10 text-center text-4xl font-bold"
    >
        Загрузка...
    </div>
    <div v-else-if="error" class="py-10 text-center text-red-500">
        {{ error }}
    </div>
    <journal-list
        v-else
        class="mb-4 block"
        :entries="allEntries"
        :is-loading-more="isLoadingMore"
        :loading-label="loadingLabel"
        @load-more="loadPage(currentPage + 1, true)"
    />
</template>
