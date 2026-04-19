import { artefactsApi } from '@/entities/artefact'
import { PAGE_SIZE } from '../consts/artefacts-page.consts'
import { infiniteQueryOptions } from '@tanstack/vue-query'

export function artefactsPageQueryOptions() {
    return infiniteQueryOptions({
        queryKey: ['artefacts'],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => {
            return artefactsApi.get({
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
        staleTime: 1000 * 60 * 60 * 24,
    })
}
