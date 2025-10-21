<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from 'vue'
import { spiritApi, type Spirit } from '@/entities/spirit'
import { fetchCatchers } from '@/entities/catcher'
import type { Catcher } from '@/entities/catcher/model/types'
import { AdvertisingBanner } from '@/entities/banner'
import { usePageBanner } from '@/entities/banner/model/usePageBanner'
import { LeaderCard } from '@/widgets/leader-card'
import { SpiritList } from '@/widgets/spirit-list'
import { AchievementsList } from '@/widgets/achievements-list'
import { PageName } from '@/shared/config'
import { useLoadingLabels } from '@/shared/composables'
import { LOADING_LABELS } from '@/pages/leaderboard'
import { useRoute, useRouter } from 'vue-router'
import type { TabsItem } from '@nuxt/ui'
import { CatchersList } from '@/widgets/catchers-list'

const PAGE_SIZE = 25
const currentPage = ref(1)
const isLoading = ref(false)
const isLoadingMore = ref(false)
const hasNextPage = ref(true)
const allSpirits = shallowRef<Spirit[]>([])
const error = ref<string | null>(null)
const isAchievementsDrawerOpen = ref(false)
const route = useRoute()
const router = useRouter()

const catchers = ref<Catcher[]>([])
const catchersLoading = ref(false)
const catchersError = ref<string | null>(null)

const tabs: TabsItem[] = [
    {
        label: 'Духи подземелья',
        icon: 'i-token:spirit',
        slot: 'top_spirits',
        value: 'top_spirits',
    },
    {
        label: 'Поймай коалу',
        icon: 'i-game-icons:koala',
        slot: 'catch_koala',
        value: 'catch_koala',
    },
]

const loadPage = async (page: number, append = false) => {
    if (isLoading.value || isLoadingMore.value || !hasNextPage.value) return

    if (page === 1) isLoading.value = true
    else isLoadingMore.value = true
    error.value = null
    try {
        const { spirits, pagination } = await spiritApi.fetchSpirits({
            page,
            pageSize: PAGE_SIZE,
            isHidden: false,
        })
        if (append) {
            allSpirits.value = [...allSpirits.value, ...spirits]
        } else {
            allSpirits.value = spirits
        }
        hasNextPage.value = pagination.total > page * PAGE_SIZE
        currentPage.value = page
    } catch (e: any) {
        error.value = 'Ошибка загрузки'
    } finally {
        isLoading.value = false
        isLoadingMore.value = false
    }
}

const loadCatchers = async () => {
    try {
        catchersLoading.value = true
        catchersError.value = null
        const result = await fetchCatchers.fetch({ page: 1, pageSize: 20 })
        catchers.value = result.catchers
    } catch (err) {
        catchersError.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных'
        console.error('Ошибка загрузки ловцов:', err)
    } finally {
        catchersLoading.value = false
    }
}

const { loadingLabel } = useLoadingLabels(LOADING_LABELS, isLoadingMore)

const topHeroes = computed<Spirit[]>(() => allSpirits.value.slice(0, 3))

const getLeaderCardProps = (spirit: Spirit, index: number) => ({
    place: index + 1,
    name: spirit.nickname,
    interferenceWheelSpins: spirit.obstacleSpins ?? 0,
    helpWheelSpins: spirit.helpSpins ?? 0,
    deferredInterferences: spirit.scheduledSpins ?? 0,
    totalDonations: spirit.amount ?? 0,
    achievements: spirit.achievements ?? [],
    rerolls: spirit.reroll ?? 0,
})

const { pageBanner: leaderboardsBanner } = usePageBanner(PageName.LEADERBOARD)

const topThreeClasses = computed<string>(() => {
    return leaderboardsBanner.value
        ? 'mb-8 grid grid-cols-1 gap-10 py-8 md:grid-cols-2 md:gap-12 lg:mb-16 lg:grid-cols-[auto_1fr_1fr_1fr] lg:gap-4'
        : 'mb-8 grid grid-cols-1 gap-10 py-8 md:mb-16 md:grid-cols-3 md:gap-6'
})

const active = computed({
    get() {
        return (route.query.tab as string) || tabs[0].value
    },
    set(tab) {
        // Hash is specified here to prevent the page from scrolling to the top
        router.push({
            path: '/leaderboard',
            query: { tab },
            hash: '#tab',
        })
    },
})

function openAchievementsDrawer() {
    isAchievementsDrawerOpen.value = true
}

onMounted(async () => {
    await Promise.all([
        loadPage(1),
        loadCatchers()
    ])
})
</script>

<template>
    <div class="mb-8 flex items-baseline justify-between">
        <h1 class="kd-h1 mb-0">Зал славы</h1>
        <u-button
            icon="i-game-icons:trophy"
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
    <u-tabs
        v-model="active"
        :items="tabs"
        :ui="{
            root: 'rounded-3xl',
            list: 'rounded-3xl',
            indicator: 'rounded-3xl',
            trigger: 'rounded-3xl',
            content: 'pt-4',
        }"
        size="lg"
    >
        <template #top_spirits>
            <div
                v-if="isLoading"
                class="font-amatic py-10 text-center text-4xl font-bold"
            >
                Загрузка...
            </div>
            <div v-else-if="error" class="py-10 text-center text-red-500">
                {{ error }}
            </div>
            <u-container v-else class="px-0 md:px-0 lg:px-0">
                <h3 class="font-amatic mb-4 text-3xl font-bold">Топ духов</h3>
                <div :class="topThreeClasses">
                    <advertising-banner
                        v-if="leaderboardsBanner"
                        :banner="leaderboardsBanner"
                        :width="190"
                    />

                    <leader-card
                        v-for="(hero, index) in topHeroes"
                        :key="hero.id"
                        v-bind="getLeaderCardProps(hero, index)"
                    />
                </div>

                <spirit-list
                    :spirits="allSpirits"
                    :is-loading-more="isLoadingMore"
                    :loading-label="loadingLabel"
                    @load-more="loadPage(currentPage + 1, true)"
                />
            </u-container>
        </template>
        <template #catch_koala>
            <div>
                <h3 class="font-amatic mb-4 text-3xl font-bold">
                    Топ ловцов
                </h3>
                <catchers-list
                    :catchers="catchers"
                    :loading="catchersLoading"
                    :error="catchersError"
                    @retry="loadCatchers"
                />
            </div>
        </template>
    </u-tabs>

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
