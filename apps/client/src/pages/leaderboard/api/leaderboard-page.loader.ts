import { defineBasicLoader } from "vue-router/dist/experimental/index.js"
import { useQueryClient } from "@tanstack/vue-query"
import { leaderboardsQueryOptions } from "./leaderboards.query"

export const useLeaderboards = defineBasicLoader('leaderboard', async () => {
    const queryClient = useQueryClient()

    await queryClient.prefetchInfiniteQuery({
        ...leaderboardsQueryOptions(),
        pages: 1,
    })
})
