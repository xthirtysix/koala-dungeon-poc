import type {
    MetaResponsePaginationByOffset,
    MetaResponsePaginationByPage,
} from '@nuxtjs/strapi'
import { buildQuery } from '@/shared/api'

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
    spirits: SpiritApi[]
    pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
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
                `https://api.xthirtysix.ru/api/spirits?${query}`,
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
