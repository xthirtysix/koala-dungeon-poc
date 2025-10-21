import type { FetchCatchersParams, FetchCatchersResult } from '@/entities/catcher/model/types'
import { buildQuery } from '@/shared/api'
import { API_URL } from '@/shared/config/consts/api.consts'

export const fetchCatchers = {
  fetch: async ({
    page = 1,
    pageSize = 10,
  }: FetchCatchersParams = {}): Promise<FetchCatchersResult> => {
    const query = buildQuery({
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'sort': 'score:desc',
    })

    try {
      const res = await fetch(`${API_URL}/catchers?${query}`)
      if (!res.ok) throw new Error('Ошибка загрузки ловцов')
      const response = await res.json()

      return {
        catchers: response.data,
        pagination: response.meta.pagination,
      }
    } catch (error) {
      console.error('Ошибка при загрузке ловцов:', error)
      throw error
    }
  },
}
