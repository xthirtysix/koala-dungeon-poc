import { infiniteQueryOptions } from '@tanstack/vue-query'
import { spiritApi } from "@/entities/spirit"
import { PAGE_SIZE } from "../consts/leaderboard.consts"

export function leaderboardsQueryOptions() {
    return infiniteQueryOptions({
        queryKey: ['leaderboard'],
        initialPageParam: 0,
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            return spiritApi.getSpirits({
                page: pageParam,
                pageSize: PAGE_SIZE,
                isHidden: false,
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
