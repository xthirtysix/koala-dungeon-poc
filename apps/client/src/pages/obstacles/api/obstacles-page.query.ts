import { infiniteQueryOptions } from '@tanstack/vue-query'
import { obstaclesApi } from '@/entities/obstacle'
import { PAGE_SIZE } from '../consts/obstacles-page.consts'

export function obstaclesPageQueryOptions() {
    return infiniteQueryOptions({
        queryKey: ['obstacles'],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            return obstaclesApi.getObstacles({
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
