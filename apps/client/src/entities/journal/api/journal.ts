import type { JournalEntry } from '@/entities/journal'
import { buildQuery } from '@/shared/api'
import { API_URL } from '@/shared/config/consts/api.consts'

interface FetchJournalEntriesParams {
    page: number
    pageSize: number
}

interface FetchJournalEntriesResult {
    entries: JournalEntry[]
    pagination: {
        page: number
        pageCount: number
        pageSize: number
        total: number
    }
}

export default {
    fetchEntries: async ({
        page,
        pageSize,
    }: FetchJournalEntriesParams): Promise<FetchJournalEntriesResult> => {
        const query = buildQuery({
            'fields[0]': 'id',
            'fields[1]': 'cell',
            'fields[2]': 'description',
            'fields[3]': 'game_result',
            'fields[4]': 'hero',
            'fields[5]': 'marathon_day',
            'fields[6]': 'time',
            'fields[7]': 'type',
            'sort[0]': 'marathon_day:desc',
            'sort[1]': 'time:desc',
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
        })
        try {
            const res = await fetch(
                `${API_URL}/journal-entries?${query}`,
            )
            if (!res.ok) throw new Error('Ошибка загрузки журнала')
            const response = await res.json()
            return {
                entries: response.data,
                pagination: response.meta.pagination,
            }
        } catch (error) {
            console.error('Ошибка при загрузке записей журнала:', error)
            throw error
        }
    },
}
