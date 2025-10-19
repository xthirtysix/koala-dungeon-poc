import { buildQuery } from '@/shared/api/build-query'
import { API_URL } from '@/shared/config/consts/api.consts'
import environment from '@/shared/config/app/environment'

export interface RulesShort {
    rules: string // markdown
    version: string
}

export default {
    fetchRules: async (): Promise<RulesShort[]> => {
        const query = buildQuery({
            'fields[0]': 'rules',
            'fields[1]': 'version',
            'sort[0]': 'version:desc',
        })
        try {
            const res = await fetch(`${API_URL}/rules?${query}`)
            if (!res.ok) throw new Error('Ошибка загрузки правил')
            const response = await res.json()
            return response.data.map((item: any) => ({
                rules: item.rules,
                version: item.version,
            }))
        } catch (error) {
            // Логируем ошибку
            console.error('Ошибка при загрузке правил:', error)
            throw error
        }
    },
}
