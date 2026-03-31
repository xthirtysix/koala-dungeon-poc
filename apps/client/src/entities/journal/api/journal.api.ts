import type { JournalEntry } from '@/entities/journal'
import { publicApi } from '@/shared/api'
import qs from 'qs'

interface FetchJournalEntriesParams {
    page: number
    pageSize: number
}

interface GetJournalEntriesResponse {
    data: JournalEntry[]
    meta: {
        pagination: {
            page: number
            pageCount: number
            pageSize: number
            total: number
        }
    }
}

export default {
    getEntries: async ({
        page,
        pageSize,
    }: FetchJournalEntriesParams): Promise<GetJournalEntriesResponse> => {
        try {
            const response = await publicApi.get<GetJournalEntriesResponse>('journal-entries', {
                searchParams: qs.stringify({
                    fields: ['id', 'cell', 'description', 'game_result', 'hero', 'marathon_day', 'time', 'type', 'createdAt'],
                    filters: {
                        marathon_version: {
                            $eq: 'autumn_2025_13',
                        },
                    },
                    sort: ['marathon_day:desc', 'createdAt:desc'],
                    pagination: {
                        page,
                        pageSize,
                    },
                }),
            })
            return response
        } catch (error) {
            console.error('Ошибка при загрузке записей журнала:', error)
            throw error
        }
    },
}
