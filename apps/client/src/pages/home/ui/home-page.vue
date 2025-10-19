<script setup lang="ts">
import { MarathonTimer } from '@/widgets/marathon-timer'
import { HomeLatestWidget } from '@/widgets/home-latest'
import { AdvertisingBanner } from '@/entities/banner'
import { usePageBanner } from '@/entities/banner/model/usePageBanner'
import { PageName } from '@/shared/config'

const { pageBanner: homeBanner } = usePageBanner(PageName.MAIN)
</script>

<template>
    <h1 class="sr-only text-3xl font-bold">Марафон провинциальной стримерши</h1>

    <div class="md:flex md:justify-start w-full">
        <advertising-banner v-if="homeBanner" :banner="homeBanner" class="mr-auto"/>

        <marathon-timer class="shrink-1"/>
    </div>

    <home-latest-widget class="mt-16" />
</template>
