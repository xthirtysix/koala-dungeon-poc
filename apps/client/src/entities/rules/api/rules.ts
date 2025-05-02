import { buildQuery } from '@/shared/api/build-query'

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
            const res = await fetch(`https://api.xthirtysix.ru/api/rules?${query}`)
            if (!res.ok) throw new Error('Ошибка загрузки правил')
            const response = await res.json()
            return response.data
                .map((item: any) => ({
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
