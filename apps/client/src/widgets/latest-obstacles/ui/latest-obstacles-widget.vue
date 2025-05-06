<script setup lang="ts">
import { ref, onMounted } from 'vue'
import obstaclesApi from '@/pages/obstacles/api/obstacles'
import type { Obstacle } from '@/entities/obstacle'
import ObstacleCard from '@/entities/obstacle/ui/obstacle-card.vue'

const obstacles = ref<Obstacle[]>([])
const isLoading = ref(true)
const isError = ref(false)

onMounted(async () => {
    try {
        obstacles.value = await obstaclesApi.fetchActiveObstacles()
        isError.value = false
    } catch (e) {
        isError.value = true
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="mx-auto grid h-full w-full max-w-2xl items-start grid-rows-[auto_1fr]">
        <h2 class="kd-h2">Последние активные помехи</h2>
        <div v-if="isLoading" class="flex items-center justify-center py-8">
            <u-spinner size="lg" />
        </div>
        <div v-else-if="isError" class="py-8 text-center text-red-500">
            Не удалось загрузить данные
        </div>
        <div
            v-else-if="obstacles.length === 0"
            class="text-2xl font-bold font-amatic text-center text-gray-500"
        >
            Нет активных помех
        </div>
        <div v-else class="grid items-start gap-4">
            <ObstacleCard
                v-for="obstacle in obstacles"
                :key="obstacle.id"
                :obstacle="obstacle"
                :is-unlocked="obstacle.isUnlocked"
            />
        </div>
    </div>
</template>

<style scoped></style>
