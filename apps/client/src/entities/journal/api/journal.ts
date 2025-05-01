import type { JournalEntry } from '@/entities/journal'
import type { MetaResponsePaginationByOffset, MetaResponsePaginationByPage } from '@nuxtjs/strapi'

interface FetchJournalEntriesParams {
    page: number
    pageSize: number
}

interface FetchJournalEntriesResult {
    entries: JournalEntry[]
    pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
}

const { find } = useStrapi()

export default {
    fetchEntries: async ({ page, pageSize }: FetchJournalEntriesParams): Promise<FetchJournalEntriesResult> => {
        const response = await find<JournalEntry>('journal-entries', {
            fields: ['id', 'cell', 'description', 'game_result', 'cell', 'hero', 'marathon_day', 'time', 'type'],
            sort: ['marathon_day:desc', 'time:desc'],
            pagination: {
                page,
                pageSize
            }
        })

        return {
            entries: response.data,
            pagination: response.meta.pagination
        }
    }
}
