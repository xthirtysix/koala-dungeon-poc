import qs from 'qs'
import type { Banner } from '../model/types'
import { publicApi } from '@/shared/api'

interface FetchBannersResult {
    banners: Banner[]
}

export const bannerApi = {
    async getBanners(): Promise<FetchBannersResult> {
        try {
            const res = await publicApi.get<FetchBannersResult>('banner', {
                searchParams: qs.stringify({
                    populate: ['banners', 'banners.media'],
                    filters: {
                        banners: {
                            isActive: {
                                $eq: true,
                            },
                        },
                    },
                })
            })

            return res
        } catch (error) {
            console.error('Ошибка при загрузке баннеров:', error)
            throw error
        }
    },
}
