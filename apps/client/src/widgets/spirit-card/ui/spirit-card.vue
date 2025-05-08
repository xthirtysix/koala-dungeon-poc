<script setup lang="ts">
import type { Spirit } from '@/entities/spirit'
import { AchievementBadge } from '@/entities/achievement'

defineProps<{
    spirit: Spirit
    index: number
    showAchievements?: boolean
}>()
</script>

<template>
    <div
        :class="[
            'overflow-hidden rounded-lg transition-all duration-300',
            index === 0
                ? 'border-2 border-yellow-400 bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-900/10'
                : index === 1
                  ? 'border-2 border-gray-400 bg-gradient-to-b from-gray-200/70 to-transparent dark:from-gray-700/30'
                  : index === 2
                    ? 'border-2 border-amber-600 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/10'
                    : index === 3
                      ? 'border-2 border-blue-400 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10'
                      : index === 4
                        ? 'border-2 border-emerald-400 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/10'
                        : 'bg-gray-50 dark:bg-gray-800',
        ]"
    >
        <!-- Основная информация -->
        <div class="flex items-center justify-between p-4">
            <div class="flex w-[300px] items-center gap-4">
                <div class="flex items-center gap-2">
                    <span class="w-8 text-gray-500 dark:text-gray-400">{{
                        index + 1
                    }}</span>
                    <u-icon
                        v-if="index < 5"
                        :name="
                            index === 0
                                ? 'i-hugeicons:medal-first-place'
                                : index === 1
                                  ? 'i-hugeicons:medal-second-place'
                                  : index === 2
                                    ? 'i-hugeicons:medal-third-place'
                                    : index === 3
                                      ? 'i-hugeicons:star'
                                      : 'i-hugeicons:star-half'
                        "
                        :class="[
                            'h-5 w-5',
                            index === 0
                                ? 'text-yellow-500'
                                : index === 1
                                  ? 'text-gray-400'
                                  : index === 2
                                    ? 'text-amber-700'
                                    : index === 3
                                      ? 'text-blue-500'
                                      : 'text-emerald-500',
                        ]"
                    />
                </div>
                <div class="font-amatic truncate text-2xl font-bold">
                    {{ spirit.nickname }}
                </div>
            </div>

            <div class="hidden items-center md:flex">
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Помехи
                    </div>
                    <div class="font-medium">{{ spirit.obstacleSpins || 0 }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Помощь
                    </div>
                    <div class="font-medium">{{ spirit.helpSpins || 0 }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Отложено
                    </div>
                    <div class="font-medium">{{ spirit.scheduledSpins || 0 }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Донаты
                    </div>
                    <div class="font-medium">{{ spirit.amount || 0 }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Реролл
                    </div>
                    <div class="font-medium">{{ spirit.reroll || 0  }}</div>
                </div>
            </div>
        </div>

        <!-- Трофеи -->
        <div
            v-if="showAchievements && spirit.achievements?.length"
            class="flex justify-center gap-3 border-t border-gray-200 bg-gray-100/50 px-2 py-2 dark:border-gray-600 dark:bg-gray-700/50"
        >
            <achievement-badge
                v-for="achievement in spirit.achievements"
                :key="achievement.id"
                :achievement="achievement"
            />
        </div>
    </div>
</template>
