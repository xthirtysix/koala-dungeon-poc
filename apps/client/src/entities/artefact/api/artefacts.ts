import type { Artefact } from '@/entities/artefact/model/types'
import { buildQuery } from '@/shared/api'
import { API_URL } from '@/shared/config/consts/api.consts'

interface FetchArtefactsParams {
    page: number
    pageSize: number
}

interface FetchArtefactsResult {
    artefacts: Artefact[]
    pagination: {
        page: number
        pageCount: number
        pageSize: number
        total: number
    }
}

export const fetchArtefacts = {
    fetch: async ({
        page,
        pageSize,
    }: FetchArtefactsParams): Promise<FetchArtefactsResult> => {
        const query = buildQuery({
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'sort': 'name',
        })
        try {
            const res = await fetch(
                `${API_URL}/artefacts?populate[0]=image&populate[1]=bonus&${query}`,
            )
            if (!res.ok) throw new Error('Ошибка загрузки артефактов')
            const response = await res.json()
            return {
                artefacts: response.data,
                pagination: response.meta.pagination,
            }
        } catch (error) {
            console.error('Ошибка при загрузке артефактов:', error)
            throw error
        }
    },
}
