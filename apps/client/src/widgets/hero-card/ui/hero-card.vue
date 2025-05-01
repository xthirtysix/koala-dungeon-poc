<script setup lang="ts">
import type { Hero } from '@/entities/hero'
import { AchievementBadge } from '@/entities/achievement'

defineProps<{
    hero: Hero
    index: number
    showAchievements?: boolean
}>()
</script>

<template>
    <div
        :class="[
            'rounded-lg overflow-hidden transition-all duration-300',
            index === 0 ? 'border-2 border-yellow-400 bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-900/10' :
            index === 1 ? 'border-2 border-gray-400 bg-gradient-to-b from-gray-200/70 to-transparent dark:from-gray-700/30' :
            index === 2 ? 'border-2 border-amber-600 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/10' :
            index === 3 ? 'border-2 border-blue-400 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10' :
            index === 4 ? 'border-2 border-emerald-400 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/10' :
            'bg-gray-50 dark:bg-gray-800'
        ]"
    >
        <!-- Основная информация -->
        <div class="flex items-center justify-between p-4">
            <div class="flex items-center gap-4 w-[300px]">
                <div class="flex items-center gap-2">
                    <span class="text-gray-500 dark:text-gray-400 w-8">{{ index + 1 }}</span>
                    <u-icon
                        v-if="index < 5"
                        :name="index === 0 ? 'i-hugeicons:medal-first-place' :
                               index === 1 ? 'i-hugeicons:medal-second-place' :
                               index === 2 ? 'i-hugeicons:medal-third-place' :
                               index === 3 ? 'i-hugeicons:star' :
                               'i-hugeicons:star-half'"
                        :class="[
                            'w-5 h-5',
                            index === 0 ? 'text-yellow-500' :
                            index === 1 ? 'text-gray-400' :
                            index === 2 ? 'text-amber-700' :
                            index === 3 ? 'text-blue-500' :
                            'text-emerald-500'
                        ]"
                    />
                </div>
                <div class="font-medium truncate">{{ hero.name }}</div>
            </div>

            <div class="flex items-center">
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">Помехи</div>
                    <div class="font-medium">{{ hero.interferenceWheelSpins }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">Помощь</div>
                    <div class="font-medium">{{ hero.helpWheelSpins }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">Отложено</div>
                    <div class="font-medium">{{ hero.deferredInterferences }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">Донаты</div>
                    <div class="font-medium">{{ hero.totalDonations }}</div>
                </div>
                <div class="w-[100px] text-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">Реролл</div>
                    <div class="font-medium">{{ hero.rerolls }}</div>
                </div>
            </div>
        </div>

        <!-- Трофеи -->
        <div
            v-if="showAchievements && hero.achievements.length"
            class="flex justify-center gap-3 px-2 py-2 bg-gray-100/50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600"
        >
            <achievement-badge
                v-for="achievement in hero.achievements"
                :key="achievement"
                :achievement="achievement"
            />
        </div>
    </div>
</template>
