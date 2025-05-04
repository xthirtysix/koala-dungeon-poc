import type { Artefact } from '@/entities/artefact/model/types'
import type {
    MetaResponsePaginationByOffset,
    MetaResponsePaginationByPage,
} from '@nuxtjs/strapi'
import { buildQuery } from '@/shared/api'

interface FetchArtefactsParams {
    page: number
    pageSize: number
}

interface FetchArtefactsResult {
    artefacts: Artefact[]
    pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
}

export const fetchArtefacts = {
    fetch: async ({
        page,
        pageSize,
    }: FetchArtefactsParams): Promise<FetchArtefactsResult> => {
        const query = buildQuery({
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
        })
        try {
            const res = await fetch(
                `https://api.xthirtysix.ru/api/artefacts?populate[0]=image&populate[1]=bonus&${query}`,
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
