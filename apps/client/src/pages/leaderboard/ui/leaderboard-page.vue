<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, computed } from 'vue'
import { spiritApi, type Spirit } from '@/entities/spirit'
import { LeaderCard } from '@/widgets/leader-card'
import { SpiritList } from '@/widgets/spirit-list'
import {
    type Banner,
    useBannerStore,
    AdvertisingBanner,
} from '@/entities/banner'

const PAGE_SIZE = 25
const currentPage = ref(1)
const isLoading = ref(false)
const isLoadingMore = ref(false)
const hasNextPage = ref(true)
const allSpirits = shallowRef<Spirit[]>([])
const error = ref<string | null>(null)

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
        // Приводим к типу Spirit (name = nickname)
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

const loadingMessages = [
    'Духи собираются на совет...',
    'Считаем донаты духов...',
    'Духи спорят за лидерство...',
    'Призываем новых духов в зал славы...',
    'Духи готовят свои достижения...',
]

const currentLoadingMessage = ref(loadingMessages[0])

watch(isLoadingMore, (val) => {
    if (val) {
        const idx = Math.floor(Math.random() * loadingMessages.length)
        currentLoadingMessage.value = loadingMessages[idx]
    }
})

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

const bannerStore = useBannerStore()

const leaderboardsBanner = computed<Banner | undefined>(() => {
    return bannerStore.banners.find(
        (banner) => banner.pageName === 'leaderboard',
    )
})

onMounted(async () => {
    await loadPage(1)
})
</script>

<template>
    <h1 class="kd-h1">Зал славы</h1>
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
        <div
            v-if="leaderboardsBanner"
            class="mb-8 grid grid-cols-1 gap-10 py-8 md:grid-cols-2 md:gap-12 lg:mb-16 lg:grid-cols-[auto_1fr_1fr_1fr] lg:gap-4"
        >
            <advertising-banner :banner="leaderboardsBanner" :width="200" />

            <leader-card
                v-for="(hero, index) in topHeroes"
                :key="hero.id"
                v-bind="getLeaderCardProps(hero, index)"
            />
        </div>

        <div
            v-else
            class="mb-8 grid grid-cols-1 gap-10 py-8 md:mb-16 md:grid-cols-3 md:gap-6"
        >
            <leader-card
                v-for="(hero, index) in topHeroes"
                :key="hero.id"
                v-bind="getLeaderCardProps(hero, index)"
            />
        </div>

        <spirit-list
            :spirits="allSpirits"
            :is-loading-more="isLoadingMore"
            :current-loading-message="currentLoadingMessage"
            @load-more="loadPage(currentPage + 1, true)"
        />
    </u-container>
</template>
