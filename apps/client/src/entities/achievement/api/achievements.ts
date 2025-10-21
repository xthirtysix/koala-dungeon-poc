import { buildQuery } from '@/shared/api'
import { type Achievement } from '../model/achievement-model'
import { API_URL } from '@/shared/config/consts/api.consts'

interface FetchAchievementsParams {
    page?: number
    pageSize?: number
    isHidden?: boolean
}

interface FetchAchievementsResult {
    achievements: Achievement[]
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}

export default {
    fetchAchievements: async ({
        page = 1,
        pageSize = 50,
        isHidden = false,
    }: FetchAchievementsParams = {}): Promise<FetchAchievementsResult> => {
        const query = buildQuery({
            'populate[image][fields][0]': 'url',
            'fields[0]': 'name',
            'fields[1]': 'description',
            'sort[0]': 'priority:asc',
            'filters[isHidden][$eq]': isHidden,
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
        })
        try {
            const res = await fetch(`${API_URL}/achievements?${query}`)
            if (!res.ok) throw new Error('Ошибка загрузки ачивок')
            const response = await res.json()
            return {
                achievements: response.data,
                pagination: response.meta.pagination,
            }
        } catch (error) {
            console.error('Ошибка при загрузке ачивок:', error)
            throw error
        }
    },
}
