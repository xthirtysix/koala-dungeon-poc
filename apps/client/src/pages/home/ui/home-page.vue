<script setup lang="ts">
import { computed } from 'vue'
import { MarathonTimer } from '@/widgets/marathon-timer'
import { HomeLatestWidget } from '@/widgets/home-latest'
import { type Banner, AdvertisingBanner } from '@/entities/banner'
import { usePageBanner } from '@/entities/banner/model/usePageBanner'
import { PageName } from '@/shared/config'

const { pageBanner: homeBanner } = usePageBanner(PageName.MAIN)
</script>

<template>
    <h1 class="sr-only text-3xl font-bold">Марафон провинциальной стримерши</h1>

    <advertising-banner v-if="homeBanner" :banner="homeBanner" />

    <marathon-timer />

    <home-latest-widget class="mt-16" />
</template>
