import type { Marathon } from '@/entities/marathon'
import { buildQuery } from '@/shared/api'

// TODO: заменить на реальные моки, если появятся
const mockMarathon: Marathon = {
  id: 1,
  startTime: '2025-05-07T13:00:00.000Z',
  totalTime: 144000,
  passedTime: 0,
  isPaused: true,
}

export default {
  fetchMarathon: async (): Promise<Marathon> => {
    const query = buildQuery({})

    try {
      const res = await fetch(`https://api.xthirtysix.ru/api/marathon?${query}`)
      if (!res.ok) throw new Error('Ошибка загрузки марафона')
      const response = await res.json()

      return {
        id: response.data.id,
        startTime: response.data.startTime,
        totalTime: response.data.totalTime,
        passedTime: response.data.passedTime,
        isPaused: response.data.isPaused,
      }
    } catch (error) {
      console.error('Ошибка при загрузке марафона:', error)
      return mockMarathon
    }
  },
}
