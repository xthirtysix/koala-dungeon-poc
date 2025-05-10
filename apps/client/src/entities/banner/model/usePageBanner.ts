import { computed } from 'vue'
import { useBannerStore, type Banner } from '@/entities/banner'
import { PageName } from '@/shared/config'

export const usePageBanner = (pageName: PageName) => {
    const bannerStore = useBannerStore()

    const pageBanner = computed<Banner | undefined>(() => {
        return bannerStore.banners.find(
            (banner) => banner.pageName === pageName && banner.isActive,
        )
    })

    return {
        pageBanner,
    }
}
