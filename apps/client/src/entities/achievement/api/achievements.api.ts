import { publicApi } from '@/shared/api'
import { type Achievement } from '../model/achievement-model'
import qs from 'qs'

interface GetAchievementsParams {
    page?: number
    pageSize?: number
    isHidden?: boolean
}

interface GetAchievementsResponse {
    data: Achievement[]
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
    getAchievements: async ({
        page = 1,
        pageSize = 50,
        isHidden = false,
    }: GetAchievementsParams = {}): Promise<GetAchievementsResponse> => {
        try {
            const response = await publicApi.get<GetAchievementsResponse>('achievements', {
                searchParams: qs.stringify({
                    'populate[image][fields][0]': 'url',
                    sort: ['priority:asc'],
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
            console.error('Ошибка при загрузке ачивок:', error)
            throw error
        }
    },
}
