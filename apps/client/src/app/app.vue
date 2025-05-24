<script setup lang="ts">
import { computed, onMounted, toRef } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useBannerStore } from '@/entities/banner'
import { MainHeader } from '@/widgets/main-header'
import { DefaultLayout } from '@/shared/ui/layouts'
import { useDiceButtonFeatureFlag, FastDice } from '@/widgets/fast-dice'

const route = useRoute()
const diceButtonFeatureFlag = toRef(
    useDiceButtonFeatureFlag(),
    'IS_DICE_BUTTON_VISIBLE',
)

const bannerStore = useBannerStore()

const layout = computed(() => route.meta.layout || DefaultLayout)

onMounted(async () => {
    await bannerStore.fetchBanners()
})
</script>

<template>
    <u-app>
        <component :is="layout">
            <template #header>
                <main-header />
            </template>

            <template #default>
                <router-view />
            </template>
        </component>
        <fast-dice
            class="fixed bottom-8 right-8"
            v-if="diceButtonFeatureFlag"
        />
    </u-app>
</template>
