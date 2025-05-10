import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bannerApi, type Banner } from '@/entities/banner'

export const useBannerStore = defineStore('banner', () => {
    const banners = ref<Banner[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const fetchBanners = async () => {
        try {
            isLoading.value = true
            error.value = null
            const result = await bannerApi.getBanners()
            banners.value = result.banners
        } catch (e) {
            error.value =
                e instanceof Error ? e.message : 'Failed to fetch banners'
        } finally {
            isLoading.value = false
        }
    }

    return {
        banners,
        isLoading,
        error,
        fetchBanners,
    }
})
