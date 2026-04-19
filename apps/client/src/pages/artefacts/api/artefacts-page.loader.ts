import { artefactsPageQueryOptions } from './artefacts-page.query'
import { defineBasicLoader } from 'vue-router/dist/experimental/index.js'
import { useQueryClient } from '@tanstack/vue-query'

export const useArtefacts = defineBasicLoader('library/artefacts', async () => {
    const queryClient = useQueryClient()

    await queryClient.prefetchInfiniteQuery({
        ...artefactsPageQueryOptions(),
        pages: 1,
    })
})
