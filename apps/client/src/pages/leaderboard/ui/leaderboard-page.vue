<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Spirit } from '@/entities/spirit'
import { AdvertisingBanner } from '@/entities/banner'
import { usePageBanner } from '@/entities/banner/model/usePageBanner'
import { SpiritList, SpiritListSkeleton } from '@/widgets/spirit-list'
import { SpiritCard } from '@/widgets/spirit-card'
import { AchievementsList } from '@/widgets/achievements-list'
import { PageName } from '@/shared/config'
import { useInfiniteQuery } from '@tanstack/vue-query'
import LeaderboardPageSkeleton from './leaderboard-page-skeleton.vue'
import { leaderboardsQueryOptions } from '../api/leaderboards.query'
import { useLeaderboards } from '../api/leaderboard-page.loader'

const isAchievementsDrawerOpen = ref(false)

useLeaderboards()

const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(leaderboardsQueryOptions())

const topHeroes = computed<Spirit[]>(
    () => data.value?.pages.flatMap((page) => page.data).slice(0, 3) ?? [],
)

const allSpirits = computed<Spirit[]>(
    () => data.value?.pages.flatMap((page) => page.data) ?? [],
)

const { pageBanner: leaderboardsBanner } = usePageBanner(PageName.LEADERBOARD)

const topThreeClasses = computed<string>(() => {
    return leaderboardsBanner.value
        ? 'mb-8 grid grid-cols-1 gap-10 py-8 md:grid-cols-2 md:gap-12 lg:mb-16 lg:grid-cols-[auto_1fr_1fr_1fr] lg:gap-4'
        : 'mb-8 grid grid-cols-1 gap-10 py-8 md:mb-16 md:grid-cols-3 md:gap-6'
})

function openAchievementsDrawer() {
    isAchievementsDrawerOpen.value = true
}

function onLoadMore() {
    if (isFetchingNextPage.value) return

    fetchNextPage()
}
</script>

<template>
    <leaderboard-page-skeleton v-if="isFetching && !isFetchingNextPage" />
    <template v-else>
        <div class="mb-8 flex items-baseline justify-between">
            <h1 class="kd-h1 mb-0">Зал славы</h1>
            <u-button
                icon="i-solar:medal-star-linear"
                label="Ачивки"
                variant="solid"
                color="primary"
                size="lg"
                @click="openAchievementsDrawer"
                :ui="{
                    base: 'rounded-full',
                }"
            />
        </div>
        <u-container class="px-0 md:px-0 lg:px-0">
            <h3 class="font-amatic mb-4 text-3xl font-bold">Топ духов</h3>
            <div :class="topThreeClasses">
                <advertising-banner
                    v-if="leaderboardsBanner"
                    :banner="leaderboardsBanner"
                    :width="190"
                />

                <spirit-card
                    v-for="(hero, index) in topHeroes"
                    :key="hero.id"
                    :spirit="hero"
                    :place="index + 1"
                    achievements
                    vertical
                    with-data
                />
            </div>

            <spirit-list :spirits="allSpirits" @load-more="onLoadMore" />
            <spirit-list-skeleton
                v-if="isFetchingNextPage"
                expanded
                class="pt-4"
            />
        </u-container>

        <u-drawer
            v-model:open="isAchievementsDrawerOpen"
            title="Ачивки"
            direction="right"
            :handle="false"
            :ui="{
                title: 'text-3xl font-bold font-amatic',
            }"
        >
            <template #body>
                <achievements-list @close="isAchievementsDrawerOpen = false" />
            </template>
        </u-drawer>
    </template>
</template>
