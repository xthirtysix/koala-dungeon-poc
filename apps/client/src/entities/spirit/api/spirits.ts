
import { buildQuery } from '@/shared/api'
import type { Spirit } from '@/entities/spirit/model/types'
import { API_URL } from '@/shared/config/consts/api.consts'

export interface SpiritAchievement {
    id: number
    // ... другие поля компонента achievements
}

export interface SpiritApi {
    id: number
    nickname: string
    obstacleSpins: number
    helpSpins: number
    scheduledSpins: number
    amount: number
    reroll: number
    isHidden: boolean
    achievements: SpiritAchievement[]
}

interface FetchSpiritsParams {
    page?: number
    pageSize?: number
    isHidden?: boolean
}

interface FetchSpiritsResult {
    spirits: Spirit[]
    pagination: {
        page: number
        pageCount: number
        pageSize: number
        total: number
    }
}

export default {
    fetchSpirits: async ({
        page = 1,
        pageSize = 25,
        isHidden = false,
    }: FetchSpiritsParams = {}): Promise<FetchSpiritsResult> => {
        const query = buildQuery({
            'populate[achievements][populate][image][fields][0]': 'url',
            'sort[0]': 'amount:desc',
            'sort[1]': 'createdAt:asc',
            'sort[2]': 'nickname:asc',
            'filters[isHidden][$eq]': isHidden,
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
        })
        try {
            const res = await fetch(
                `${API_URL}/spirits?${query}`,
            )
            if (!res.ok) throw new Error('Ошибка загрузки духов')
            const response = await res.json()
            return {
                spirits: response.data,
                pagination: response.meta.pagination,
            }
        } catch (error) {
            console.error('Ошибка при загрузке духов:', error)
            throw error
        }
    },
}
