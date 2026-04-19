<script setup lang="ts">
import {  computed } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query';
import { achievementApi } from '@/entities/achievement'
import AchievementCard from './achievement-card.vue'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ['achievements'],
    initialPageParam: 1,
    queryFn: () => achievementApi.getAchievements({
        pageSize: 20,
        isHidden: false,
    }),
    getNextPageParam: (lastPage) => {
        const { page, pageCount } = lastPage.meta.pagination

        if (page === pageCount) {
            return undefined
        }

        return page + 1
    },
    staleTime: 1000 * 60 * 60 * 24,
})

const achievements = computed(() => {
    return data.value?.pages.flatMap((page) => page.data) ?? []
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <template v-if="isLoading">
            <u-skeleton v-for="i in 10" :key="i" class="h-16 rounded-3xl min-w-[37.625rem] min-h-[7.5rem] mb-4" />
        </template>

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
