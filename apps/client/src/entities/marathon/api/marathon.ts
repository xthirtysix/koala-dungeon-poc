import type { Marathon } from '@/entities/marathon'
import { publicApi } from '@/shared/api'
import type { StrapiResponse } from '@/shared/model/strapi.type'

const mockMarathon: Marathon = {
    id: 1,
    startTime: '2025-05-07T13:00:00.000Z',
    totalTime: 144000,
    passedTime: 0,
    isPaused: true,
    isActive: true,
}

export const marathonApi = {
    getMarathon: async (): Promise<StrapiResponse<Marathon>> => {
        try {
            const response = await publicApi.get<StrapiResponse<Marathon>>('marathon')
            return response
        } catch (error) {
            console.error('Ошибка при загрузке марафона:', error)
            return {data: mockMarathon, meta: {}}
        }
    },
}
