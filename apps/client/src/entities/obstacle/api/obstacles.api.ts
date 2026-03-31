
import { type Obstacle, obstacles as mockObstacles } from '@/entities/obstacle'
import { publicApi } from '@/shared/api'
import qs from 'qs'

interface FetchObstaclesParams {
    page: number
    pageSize: number
}

interface GetObstaclesResponse {
    data: Obstacle[]
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
    getObstacles: async ({
        page,
        pageSize,
    }: FetchObstaclesParams): Promise<GetObstaclesResponse> => {
        try {
            const response = await publicApi.get<GetObstaclesResponse>('obstacles', {
                searchParams: qs.stringify({
                    fields: ['id', 'name', 'description', 'type', 'isUnlocked', 'isActive'],
                    sort: ['isActive:desc', 'isUnlocked:desc', 'name:asc'],
                    pagination: {
                        page,
                        pageSize,
                    },
                }),
            })
            return response
        } catch (error) {
            console.error('Ошибка при загрузке помех:', error)
            const total = mockObstacles.length
            return {
                data: mockObstacles,
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: total,
                        pageCount: 1,
                        total,
                    },
                },
            }
        }
    },
    getActiveObstacles: async (): Promise<GetObstaclesResponse> => {
        try {
            const response = await publicApi.get<GetObstaclesResponse>('obstacles', {
                searchParams: qs.stringify({
                    fields: ['id', 'name', 'description', 'type', 'isUnlocked', 'isActive'],
                    sort: ['isActive:desc', 'isUnlocked:desc', 'name:asc'],
                    pagination: {
                        page: 1,
                        pageSize: 3,
                    },
                }),
            })
            return response
        } catch (error) {
            console.error('Ошибка при загрузке активных помех:', error)
            throw error
        }
    },
}
