<script setup lang="ts">
import { ref, computed, type ComponentPublicInstance } from 'vue'
import { MarathonTimer } from '@/widgets/marathon-timer'
import { HomeLatestWidget } from '@/widgets/home-latest'
import { MarathonStatsWidget } from '@/widgets/marathon-stats'
import { AdvertisingBanner } from '@/entities/banner'
import { usePageBanner } from '@/entities/banner/model/usePageBanner'
import { PageName } from '@/shared/config'

const { pageBanner: homeBanner } = usePageBanner(PageName.MAIN)

type MarathonTimerInstance = ComponentPublicInstance<typeof MarathonTimer> & {
    status: string
}

const marathonTimerRef = ref<MarathonTimerInstance | null>(null)

const showHomeLatest = computed(() => {
    try {
        const timer = marathonTimerRef.value
        if (!timer) return false
        const status = timer.status
        return  !status
    } catch {
        return false
    }
})
</script>

<template>
    <h1 class="sr-only text-3xl font-bold">Марафон провинциальной стримерши</h1>

    <div class="w-full md:flex md:justify-start">
        <advertising-banner
            v-if="homeBanner"
            :banner="homeBanner"
            class="mr-auto"
        />

        <marathon-timer ref="marathonTimerRef" class="shrink-1" />
    </div>

    <marathon-stats-widget class="mt-4" />

    <home-latest-widget v-if="showHomeLatest" class="mt-8" />
</template>
