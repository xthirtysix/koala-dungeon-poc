<script setup lang="ts">
import DashboardTile from './dashboard-tile.vue'
import light from '@/app/assets/images/dashboard/bg-light.webp'
import dark from '@/app/assets/images/dashboard/bg-dark.webp'
import { useColorMode } from '@vueuse/core'
import confetti from 'canvas-confetti'
import type { CreateTypes } from 'canvas-confetti'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineProps<{
    name: string
    image: string
}>()

const colorMode = useColorMode()

const isLoadingBg = ref(true)
const isLoadingFg = ref(true)
const confettiCanvas = ref<HTMLCanvasElement | null>(null)
const hasPlayedConfetti = ref(false)

let bg: HTMLImageElement | undefined
let fireConfetti: CreateTypes | null = null

const launchConfetti = () => {
    if (!fireConfetti) return

    fireConfetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 1 },
    })
}

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

watch(
    () => !isLoadingBg.value && !isLoadingFg.value,
    (isReady) => {
        if (!isReady || !fireConfetti || hasPlayedConfetti.value) return

        launchConfetti()
        hasPlayedConfetti.value = true
    },
    { immediate: true },
)

onMounted(() => {
    if (!confettiCanvas.value) return

    fireConfetti = confetti.create(confettiCanvas.value, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: true,
    })
})

onBeforeUnmount(() => {
    fireConfetti?.reset()
    fireConfetti = null
})
</script>

<template>
    <dashboard-tile
        class="winner"
        :ui="{ body: 'min-h-[12rem] md:h-full' }"
        @mouseenter="launchConfetti"
    >
        <canvas
            ref="confettiCanvas"
            class="pointer-events-none absolute inset-0 z-30 h-full w-full"
        />
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
                class="winner__name font-amatic text-4xl font-bold text-green-500 dark:text-green-400"
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
        top: -0.25rem;
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
