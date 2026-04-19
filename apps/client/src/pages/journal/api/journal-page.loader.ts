import { defineBasicLoader } from 'vue-router/dist/experimental/index.js'
import { useQueryClient } from '@tanstack/vue-query'
import { journalPageQueryOptions } from './journal-page.query'

export const useJournal = defineBasicLoader('library/journal', async () => {
    const queryClient = useQueryClient()

    await queryClient.prefetchInfiniteQuery({
        ...journalPageQueryOptions(),
        pages: 1,
    })
})
