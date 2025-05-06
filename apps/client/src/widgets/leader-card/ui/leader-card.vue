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
            class="absolute -top-6 left-1/2 -translate-x-1/2 transform"
        >
            <div
                class="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                :class="medalClasses"
            >
                <u-icon :name="medalIcon" class="text-2xl text-white" />
            </div>
        </div>

        <div class="flex gap-6">
            <div class="flex-1">
                <!-- Имя -->
                <div class="mb-6 pt-4 text-center">
                    <h3 class="kd-h2">{{ name }}</h3>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Место #{{ place }}
                    </div>
                </div>

                <!-- Статистика -->
                <div class="grid grid-cols-2 gap-4">
                    <div
                        class="flex h-20 flex-col justify-center rounded-lg p-2 text-center"
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
                        class="flex h-20 flex-col justify-center rounded-lg p-2 text-center"
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
                        class="flex h-20 flex-col justify-center rounded-lg p-2 text-center"
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
                        class="flex h-20 flex-col justify-center rounded-lg p-2 text-center"
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
                        class="flex h-20 flex-col justify-center rounded-lg p-2 text-center"
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
                        class="flex h-20 flex-col justify-center rounded-lg p-2 text-center"
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
                class="flex w-[82px] flex-col items-center border-l border-gray-200 pl-4 md:hidden lg:flex dark:border-gray-700"
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
