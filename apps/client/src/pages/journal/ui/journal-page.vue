<script setup lang="ts">
import { ref, shallowRef, watch, onMounted } from 'vue'
import { type JournalEntry, journalApi } from '@/entities/journal'
import { JournalList } from '@/widgets/journal'

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

const loadingMessages = [
    'Перелистываем страницы дневника...',
    'Записи ищут свою ручку...',
    'Дневник вспоминает, что было вчера...',
    'Новые истории уже бегут к вам!',
    'Пишем новые главы приключений...'
]

const currentLoadingMessage = ref(loadingMessages[0])

watch(isLoadingMore, (val) => {
    if (val) {
        const idx = Math.floor(Math.random() * loadingMessages.length)
        currentLoadingMessage.value = loadingMessages[idx]
    }
})

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
    <div v-if="isLoading" class="py-10 text-center font-amatic text-2xl">
        Загрузка...
    </div>
    <div v-else-if="error" class="text-center text-red-500 py-10">
        {{ error }}
    </div>
    <journal-list
        v-else
        class="block mb-4"
        :entries="allEntries"
        :is-loading-more="isLoadingMore"
        :current-loading-message="currentLoadingMessage"
        @load-more="loadPage(currentPage + 1, true)"
    />
</template>
