import { API_URL } from '@/shared/config'
import { buildQuery } from '@/shared/api'
import type { RollEntry, RollResult } from '@/features/dice'

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

export async function fetchRolls(params: FetchRollsParams = {}): Promise<{
    rolls: RollEntry[]
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}> {
    const queryParams = {
        'pagination[page]': params.page || 1,
        'pagination[pageSize]': params.pageSize || 25,
        sort: params.sort || 'date:desc',
    }

    const queryString = buildQuery(queryParams)

    try {
        const response = await fetch(`${API_URL}/rolls?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Ошибка загрузки бросков: ${response.status}`)
        }

        const data: FetchRollsResponse = await response.json()

        const rolls: RollEntry[] = data.data.map((item) => ({
            id: `server_${item.id}`,
            rollResult: item.roll_data,
            timestamp: new Date(item.date).getTime(),
            saved: true,
        }))

        return {
            rolls,
            pagination: data.meta.pagination,
        }
    } catch (error) {
        console.error('Ошибка при загрузке бросков:', error)
        throw error
    }
}
