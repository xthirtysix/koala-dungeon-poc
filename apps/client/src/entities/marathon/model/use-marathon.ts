import { useQuery } from '@pinia/colada'
import { marathonApi } from '@/entities/marathon'

export function useMarathon() {
    const { data: marathon, isLoading, error, refetch } = useQuery({
        key: ['marathon'],
        query: () => marathonApi.fetchMarathon(),
    })

    return {
        marathon,
        isLoading,
        error,
        refetch,
    }
}
