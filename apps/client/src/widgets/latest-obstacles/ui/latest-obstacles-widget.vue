<script setup lang="ts">
import { type Obstacle, ObstacleCard } from '@/entities/obstacle'

defineProps<{
    obstacles: Obstacle[]
    isLoading: boolean
    isError: boolean
}>()

const gridClasses = 'grid items-start gap-6'
</script>

<template>
    <div
        class="mx-auto grid h-full w-full max-w-2xl grid-rows-[auto_1fr] items-start"
    >
        <h2 class="kd-h2">Последние активные помехи</h2>

        <ul v-if="isLoading" :class="gridClasses">
            <li v-for="n in 3" :key="n">
                <u-skeleton class="min-h-[9rem] w-full rounded-3xl" />
            </li>
        </ul>

        <div
            v-else-if="obstacles.length === 0"
            class="font-amatic text-center text-2xl font-bold text-gray-500"
        >
            Ищем банановую кожуру 🍌
        </div>

        <ul v-else :class="gridClasses">
            <li v-for="obstacle in obstacles" :key="obstacle.id">
                <obstacle-card
                    :obstacle="obstacle"
                    :is-unlocked="obstacle.isUnlocked"
                />
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
