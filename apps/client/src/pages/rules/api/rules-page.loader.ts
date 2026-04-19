import { useQueryClient } from '@tanstack/vue-query'
import { defineBasicLoader } from 'vue-router/dist/experimental/index.js'
import { rulesPageQueryOptions } from './rules-page.query'

export const useMarathonRules = defineBasicLoader('library/rules', async () => {
    const queryClient = useQueryClient()

    await queryClient.prefetchQuery(rulesPageQueryOptions())
})
