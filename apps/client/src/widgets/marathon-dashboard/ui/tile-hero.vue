<script setup lang="ts">
import DashboardTile from './dashboard-tile.vue'
import heroImage from '@/app/assets/images/dashboard/snake-eyes.webp'
import { ref } from 'vue'

defineProps<{
    count: number
}>()

const isLoading = ref(true)

const bg = new Image()
bg.onload = () => (isLoading.value = false)
bg.onerror = () => (isLoading.value = false)
bg.src = heroImage
</script>

<template>
    <dashboard-tile>
        <template #header> Самый популярный герой </template>
        <div class="relative grid items-center justify-items-center gap-2">
            <figure class="grid items-center justify-items-center gap-3 pt-2">
                <div class="character">
                    <u-skeleton
                        v-if="isLoading"
                        class="h-30 w-30 rounded-full"
                    />
                    <img
                        v-else-if="heroImage"
                        :src="heroImage"
                        alt="Змеиные глазки"
                        class="h-30 w-auto rounded-full object-cover"
                    />
                </div>
                <figcaption class="font-amatic -mt-2 text-3xl font-bold">
                    Змеиные глазки
                </figcaption>
            </figure>
            <p class="flex items-center gap-2 rounded-full px-4">
                <span class="font-amatic text-2xl font-bold">
                    {{ count }} игры
                </span>
                <u-icon name="ph:game-controller-duotone" class="size-6" />
            </p>
        </div>
    </dashboard-tile>
</template>

<style scoped>
.character {
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        height: 8rem;
        width: 100%;
        background-size: contain;
        background-repeat: no-repeat;
    }

    &::before {
        top: -0.4rem;
        left: -0.5rem;
        background-image: url('@/app/assets/images/dashboard/frame-left.webp');
    }

    &::after {
        top: 0;
        right: -3.5rem;
        background-image: url('@/app/assets/images/dashboard/frame-right.webp');
    }
}
</style>
