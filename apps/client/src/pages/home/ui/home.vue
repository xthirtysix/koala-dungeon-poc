<script setup lang="ts">
import { MarathonTimer } from '@/widgets/marathon-timer'
import { HomeLatestWidget } from '@/widgets/home-latest'
import { useBannerStore } from '@/entities/banner/model/store'
import { computed } from 'vue'
import { type Banner, AdvertisingBanner } from '@/entities/banner'

const bannerStore = useBannerStore()

const homeBanner = computed<Banner | undefined>(() => {
    return bannerStore.banners.find((banner) => banner.pageName === 'main')
})
</script>

<template>
    <h1 class="sr-only text-3xl font-bold">Марафон провинциальной стримерши</h1>

    <advertising-banner v-if="homeBanner" :banner="homeBanner" />

    <marathon-timer />

    <home-latest-widget class="mt-16" />
</template>
