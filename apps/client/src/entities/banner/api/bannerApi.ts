import type { Banner } from '../model/types'
import { buildQuery } from '@/shared/api'
import { API_URL } from '@/shared/config/consts/api.consts'

interface FetchBannersResult {
    banners: Banner[]
}

export const bannerApi = {
    async getBanners(): Promise<FetchBannersResult> {
        const query = buildQuery({
            'populate[0]': 'banners',
            'populate[1]': 'banners.media',
            'filters[banners][isActive][$eq]': true,
        })

        try {
            const res = await fetch(
                `${API_URL}/banner?${query}`,
            )
            if (!res.ok) throw new Error('Ошибка загрузки баннеров')
            const response = await res.json()

            return {
                banners: response.data.banners,
            }
        } catch (error) {
            console.error('Ошибка при загрузке баннеров:', error)
            throw error
        }
    },
}
