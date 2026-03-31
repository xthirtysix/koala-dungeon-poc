import type { Artefact } from '@/entities/artefact/model/artefact.types'
import { publicApi } from '@/shared/api'
import qs from 'qs'

interface FetchArtefactsParams {
    page: number
    pageSize: number
}

interface GetArtefactsResponse {
    data: Artefact[]
    meta: {
        pagination: {
            page: number
            pageCount: number
            pageSize: number
            total: number
        }
    }
}

export const artefactsApi = {
    get: async ({
        page,
        pageSize,
    }: FetchArtefactsParams) => {
        try {
            const response = await publicApi.get<GetArtefactsResponse>('artefacts', {
                searchParams: qs.stringify({
                    populate: ['image'],
                    pagination: {
                        page,
                        pageSize,
                    },
                    sort: 'name',
                }),
            })
            return response
        } catch (error) {
            console.error('Ошибка при загрузке артефактов:', error)
            throw error
        }
    },
    getByNames: async (names: string[]) => {
        try {
            const res = await publicApi.get<GetArtefactsResponse>('artefacts', {
                searchParams: qs.stringify({
                    populate: ['image'],
                    filters: {
                        name: {
                            $in: names,
                        },
                    },
                }),
            })
            return res
        } catch (error) {
            console.error('Ошибка при загрузке артефактов по названиям:', error)
            throw error
        }
    },
}
