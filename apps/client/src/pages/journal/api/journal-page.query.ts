import { infiniteQueryOptions } from '@tanstack/vue-query'
import { journalApi } from '@/entities/journal'
import { PAGE_SIZE } from '../consts/journal-page.consts'

export function journalPageQueryOptions() {
    return infiniteQueryOptions({
        queryKey: ['journal'],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            return journalApi.getEntries({
                page: pageParam,
                pageSize: PAGE_SIZE,
            })
        },
        getNextPageParam: (lastPage) => {
            const { page, pageCount } = lastPage.meta.pagination

            if (page === pageCount) {
                return undefined
            }

            return page + 1
        },
    })
}
