import { publicApi } from '@/shared/api'
import type { Spirit } from '@/entities/spirit/model/types'
import qs from 'qs'

interface GetSpiritsParams {
    page?: number
    pageSize?: number
    isHidden?: boolean
}

export interface GetSpiritsResponse {
    data: Spirit[]
    meta: {
        pagination: {
            page: number
            pageCount: number
            pageSize: number
            total: number
        }
    }
}

export default {
    getSpirits: async ({
        page = 1,
        pageSize = 25,
        isHidden = false,
    }: GetSpiritsParams = {}): Promise<GetSpiritsResponse> => {
        try {
            const response = await publicApi.get<GetSpiritsResponse>('spirits', {
                searchParams: qs.stringify({
                    populate: {
                        achievements: {
                            populate: {
                                image: {
                                    fields: ['url'],
                                },
                            },
                        },
                    },
                    sort: ['amount:desc', 'updatedAt:asc', 'nickname:asc'],
                    filters: {
                        isHidden: {
                            $eq: isHidden,
                        },
                    },
                    pagination: {
                        page,
                        pageSize,
                    },
                }),
            })
            return response
        } catch (error) {
            console.error('Ошибка при загрузке духов:', error)
            throw error
        }
    },
}
