import { publicApi } from '@/shared/api'
import qs from 'qs'

interface Rule {
    rules: string
    version: string
}

export interface GetRulesResponse {
    data: Rule[]
}

export default {
    getRules: async (): Promise<GetRulesResponse> => {
        try {
            const response = await publicApi.get<GetRulesResponse>('rules', {
                searchParams: qs.stringify({
                    fields: ['rules', 'version'],
                    sort: ['version:desc'],
                }),
            })

            return response
        } catch (error) {
            console.error('Ошибка при загрузке правил:', error)
            throw error
        }
    },
}
