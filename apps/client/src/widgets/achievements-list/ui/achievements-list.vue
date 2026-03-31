<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { achievementApi, type Achievement } from '@/entities/achievement'
import AchievementCard from './achievement-card.vue'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const achievements = ref<Achievement[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const loadAchievements = async () => {
    isLoading.value = true
    error.value = null
    try {
        const { data } =
            await achievementApi.getAchievements({
                pageSize: 100,
                isHidden: false,
            })
        achievements.value = data
    } catch (e: any) {
        error.value = 'Ошибка загрузки ачивок'
        console.error('Ошибка при загрузке ачивок:', e)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadAchievements()
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-if="isLoading" class="py-10 text-center">
            <div class="font-amatic text-2xl font-bold">Загрузка ачивок...</div>
        </div>

        <div v-else-if="error" class="py-10 text-center text-red-500">
            {{ error }}
        </div>

        <div v-else-if="achievements.length === 0" class="py-10 text-center">
            <div class="font-amatic text-xl">Ачивки не найдены</div>
        </div>

        <div v-else class="grid gap-4">
            <template v-for="achievement in achievements" :key="achievement.id">
                <achievement-card :achievement="achievement" />
            </template>
        </div>
    </div>
</template>
