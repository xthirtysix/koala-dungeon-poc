<script setup lang="ts">
import { computed } from 'vue'
import { AchievementBadge, type Achievement } from '@/entities/achievement'

const props = defineProps<{
    place: number
    name: string
    interferenceWheelSpins: number
    helpWheelSpins: number
    deferredInterferences: number
    totalDonations: number
    achievements: Achievement[]
    rerolls: number
}>()

const filteredAchievements = computed(() => {
    if (!Array.isArray(props.achievements)) {
        return []
    }
    return props.achievements
})

const medalClasses = computed(() => {
    switch (props.place) {
        case 1:
            return 'bg-yellow-400 ring-2 ring-yellow-500'
        case 2:
            return 'bg-gray-400 ring-2 ring-gray-500'
        case 3:
            return 'bg-amber-600 ring-2 ring-amber-700'
        default:
            return ''
    }
})

const cardClasses = computed(() => {
    switch (props.place) {
        case 1:
            return 'border-2 border-yellow-400 bg-gradient-to-b from-yellow-50/50 to-transparent dark:from-yellow-900/10'
        case 2:
            return 'border-2 border-gray-400 bg-gradient-to-b from-gray-200/70 to-transparent dark:from-gray-700/30'
        case 3:
            return 'border-2 border-amber-600 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/10'
        default:
            return ''
    }
})

const statClasses = computed(() => {
    switch (props.place) {
        case 1:
            return 'bg-white/50 dark:bg-gray-800/50 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors duration-200'
        case 2:
            return 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/10 transition-colors duration-200'
        case 3:
            return 'bg-white/50 dark:bg-gray-800/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors duration-200'
        default:
            return 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/10 transition-colors duration-200'
    }
})

const medalIcon = computed(() => {
    switch (props.place) {
        case 1:
            return 'i-hugeicons:medal-first-place'
        case 2:
            return 'i-hugeicons:medal-second-place'
        case 3:
            return 'i-hugeicons:medal-third-place'
        default:
            return ''
    }
})
</script>

<template>
    <UCard class="relative transition-all duration-300" :class="cardClasses">
        <!-- Медаль -->
        <div
            v-if="place <= 3"
            class="absolute -top-6 left-1/2 transform -translate-x-1/2"
        >
            <div
                class="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                :class="medalClasses"
            >
                <u-icon :name="medalIcon" class="text-white text-2xl" />
            </div>
        </div>

        <div class="flex gap-6">
            <div class="flex-1">
                <!-- Имя -->
                <div class="text-center mb-6 pt-4">
                    <div class="text-xl font-bold">{{ name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Место #{{ place }}
                    </div>
                </div>

                <!-- Статистика -->
                <div class="grid grid-cols-2 gap-4">
                    <div
                        class="text-center p-2 rounded-lg flex flex-col justify-center h-20"
                        :class="statClasses"
                    >
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            Помехи
                        </div>
                        <div class="text-lg font-semibold">
                            {{ interferenceWheelSpins }}
                        </div>
                    </div>
                    <div
                        class="text-center p-2 rounded-lg flex flex-col justify-center h-20"
                        :class="statClasses"
                    >
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            Помощь
                        </div>
                        <div class="text-lg font-semibold">
                            {{ helpWheelSpins }}
                        </div>
                    </div>
                    <div
                        class="text-center p-2 rounded-lg flex flex-col justify-center h-20"
                        :class="statClasses"
                    >
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            Отложено
                        </div>
                        <div class="text-lg font-semibold">
                            {{ deferredInterferences }}
                        </div>
                    </div>
                    <div
                        class="text-center p-2 rounded-lg flex flex-col justify-center h-20"
                        :class="statClasses"
                    >
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            Донаты
                        </div>
                        <div class="text-lg font-semibold">
                            {{ totalDonations }}
                        </div>
                    </div>
                    <div
                        class="text-center p-2 rounded-lg flex flex-col justify-center h-20"
                        :class="statClasses"
                    >
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            Достижения
                        </div>
                        <div class="text-lg font-semibold">
                            {{ achievements.length }}
                        </div>
                    </div>
                    <div
                        class="text-center p-2 rounded-lg flex flex-col justify-center h-20"
                        :class="statClasses"
                    >
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            Реролл
                        </div>
                        <div class="text-lg font-semibold">{{ rerolls }}</div>
                    </div>
                </div>
            </div>

            <!-- Достижения справа -->
            <div
                v-if="filteredAchievements.length > 0"
                class="w-[82px] border-l border-gray-200 dark:border-gray-700 pl-4 flex flex-col items-center"
            >
                <u-carousel
                    v-slot="{ item }"
                    :items="filteredAchievements"
                    orientation="vertical"
                    :autoplay="{
                        delay: 4000,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true,
                    }"
                    loop
                    :arrows="filteredAchievements.length > 5"
                    :options="{
                        duration: 10,
                        skipSnaps: true,
                        dragFree: true,
                    }"
                    :ui="{
                        root: 'h-full content-center',
                        container: 'h-[360px]',
                        item: 'basis-1/5',
                        prev: '-top-2 left-1/2 -translate-x-1/2 !bg-gray-100 dark:!bg-gray-800 size-8',
                        next: '-bottom-2 left-1/2 -translate-x-1/2 !bg-gray-100 dark:!bg-gray-800 size-8',
                    }"
                >
                    <achievement-badge :achievement="item" side="right" />
                </u-carousel>
            </div>
        </div>
    </UCard>
</template>