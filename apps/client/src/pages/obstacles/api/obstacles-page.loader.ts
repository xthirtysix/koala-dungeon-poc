import { defineBasicLoader } from 'vue-router/dist/experimental/index.js'
import { useQueryClient } from '@tanstack/vue-query'
import { obstaclesPageQueryOptions } from './obstacles-page.query'

export const useObstacles = defineBasicLoader('library/obstacles', async () => {
    const queryClient = useQueryClient()

    await queryClient.prefetchInfiniteQuery({
        ...obstaclesPageQueryOptions(),
        pages: 1,
    })
})
