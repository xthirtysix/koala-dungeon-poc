import qs from 'qs'
import type { RollEntry } from '../model/rolls-store.types'
import type { RollResult } from '../model/roll-result.type'
import { privateApi, publicApi } from '@/shared/api'

export interface FetchRollsParams {
    page?: number
    pageSize?: number
    sort?: string
}

export interface FetchRollsResponse {
    data: Array<{
        id: number
        roll_data: RollResult
        date: string
        createdAt: string
        updatedAt: string
    }>
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

export const diceApi = {
    saveRollResult: async (rollResult: RollResult): Promise<void> => {
        await privateApi.post('rolls', {
            json: {
                data: {
                    roll_data: rollResult,
                    date: Date.now(),
                },
            },
        })
    },

    fetchRolls: async (params: FetchRollsParams = {}): Promise<{
        rolls: RollEntry[]
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }> => {
        try {
            const response = await publicApi.get<FetchRollsResponse>('rolls', {
                searchParams: qs.stringify({
                    pagination: {
                        page: params.page || 1,
                        pageSize: params.pageSize || 25,
                    },
                    sort: params.sort || 'date:desc',
                }),
            })
            const rolls: RollEntry[] = response.data.map((item) => ({
                id: `server_${item.id}`,
                rollResult: item.roll_data,
                timestamp: new Date(item.date).getTime(),
                saved: true,
            }))

            return {
                rolls,
                pagination: response.meta.pagination,
            }
        } catch (error) {
            console.error('Ошибка при загрузке бросков:', error)
            throw error
        }
    }

}


