import { ref } from 'vue'
import { journalApi, type JournalEntry } from '@/entities/journal'

export function useJournalEntries({ pageSize = 5 } = {}) {
  const entries = ref<JournalEntry[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadLatest = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { entries: data } = await journalApi.fetchEntries({ page: 1, pageSize })
      entries.value = data
    } catch (e: any) {
      error.value = e?.message || 'Ошибка загрузки журнала'
    } finally {
      isLoading.value = false
    }
  }

  return {
    entries,
    isLoading,
    error,
    loadLatest,
  }
}
