<script setup lang="ts">
import DashboardTile from './dashboard-tile.vue'
import light from '@/app/assets/images/dashboard/bg-light.webp'
import dark from '@/app/assets/images/dashboard/bg-dark.webp'
import { useColorMode } from '@vueuse/core'
import { ref, watch } from 'vue'

defineProps<{
    name: string
    image: string
}>()

const colorMode = useColorMode()

const isLoadingBg = ref(true)
const isLoadingFg = ref(true)

let bg: HTMLImageElement | undefined

watch(
    () => colorMode.value,
    (value) => {
        isLoadingBg.value = true

        if (bg) {
            bg.onload = null
            bg.src = ''
        }

        bg = new Image()
        bg.onload = () => (isLoadingBg.value = false)
        bg.src = value === 'dark' ? dark : light
    },
    { immediate: true },
)
</script>

<template>
    <dashboard-tile class="winner" :ui="{ body: 'min-h-[12rem] md:h-full' }">
        <u-skeleton v-if="isLoadingBg || isLoadingFg" class="h-full w-full" />
        <div
            v-else
            class="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-85"
            :style="{
                backgroundImage: `url(${colorMode === 'dark' ? dark : light})`,
            }"
        />
        <div
            v-if="!isLoadingBg && !isLoadingFg"
            class="absolute top-1/3 left-[40%] z-20 grid -translate-x-1/2 -translate-y-1/2 justify-items-center gap-2"
        >
            <span class="font-inter font-bold">Победитель</span>
            <p
                class="winner__name font-amatic text-4xl font-bold text-green-400 dark:text-green-300"
            >
                {{ name || 'AloeKoala' }}
            </p>
        </div>
        <img
            v-show="!isLoadingBg && !isLoadingFg"
            :src="image"
            :alt="name"
            @load="isLoadingFg = false"
            @error="isLoadingFg = false"
            class="absolute right-[25%] bottom-0 z-10 h-[80%] w-auto translate-x-1/2"
        />
    </dashboard-tile>
</template>

<style scoped>
.winner__name {
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 2rem;
        height: 120%;
        background-image: url('@/app/assets/images/dashboard/branch.webp');
        background-size: contain;
        background-repeat: no-repeat;
    }
    &::before {
        left: -2rem;
    }
    &::after {
        right: -2rem;
        transform: scaleX(-1);
    }
}
</style>
