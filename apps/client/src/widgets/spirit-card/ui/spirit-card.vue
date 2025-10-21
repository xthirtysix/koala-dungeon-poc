<script setup lang="ts">
import { computed } from 'vue'
import type { Spirit } from '@/entities/spirit'
import { AchievementBadge } from '@/entities/achievement'
import { colorByPlacement } from '@/widgets/leader-card'
import first from '@/app/assets/images/placements/first.webp'
import second from '@/app/assets/images/placements/second.webp'
import third from '@/app/assets/images/placements/third.webp'
import fourth from '@/app/assets/images/placements/fourth.webp'
import fifth from '@/app/assets/images/placements/fifth.webp'

const props = defineProps<{
    spirit: Spirit
    index: number
    showAchievements?: boolean
}>()

type SpiritStats = {
    label: string
    value: number
}

const cardColor = computed<string>(() => {
    if (!colorByPlacement.has(props.index + 1)) return 'bg-stone-50/20'

    return `bg-${colorByPlacement.get(props.index + 1)}-100/90`
})

const stats = computed<SpiritStats[]>(() => {
    return [
        { label: 'Помехи', value: props.spirit.obstacleSpins || 0 },
        { label: 'Помощь', value: props.spirit.helpSpins || 0 },
        { label: 'Отложено', value: props.spirit.scheduledSpins || 0 },
        { label: 'Рероллы', value: props.spirit.reroll || 0 },
        { label: 'Донаты', value: props.spirit.amount || 0 },
        { label: 'Достижения', value: props.spirit.achievements?.length || 0 },
    ]
})

const medalIcon = computed(() => {
    switch (props.index + 1) {
        case 1:
            return first
        case 2:
            return second
        case 3:
            return third
        case 4:
            return fourth
        case 5:
            return fifth
        default:
            return ''
    }
})
</script>

<template>
    <div
        :class="[
            'overflow-hidden rounded-3xl ring-1 ring-neutral-200 transition-all duration-300 dark:ring-neutral-800',
            cardColor,
        ]"
    >
        <!-- Основная информация -->
        <div
            class="relative flex items-center justify-between overflow-hidden p-4"
            :class="{ 'kd-spirits': index < 3 }"
        >
            <div
                class="kd-gradient pointer-events-none absolute top-0 left-0 h-4 w-full rounded-lg"
                :class="{ 'opacity-15': index >= 3 }"
            />
            <div class="flex w-[300px] items-center gap-4">
                <div class="flex items-center gap-2">
                    <span
                        class="w-8 text-gray-900"
                        :class="{ 'dark:text-gray-200': index >= 3 }"
                    >
                        {{ index + 1 }}
                    </span>
                </div>
                <div
                    class="font-amatic truncate text-2xl font-bold text-gray-900"
                    :class="{ 'dark:text-gray-200': index >= 3 }"
                >
                    {{ spirit.nickname }}
                </div>
                <img
                    v-if="index < 5"
                    :src="medalIcon"
                    width="50"
                    height="50"
                    class="opacity-80"
                />
            </div>

            <dl
                class="hidden items-center md:grid md:grid-flow-col md:grid-cols-5 md:grid-rows-2 md:items-center md:justify-items-center md:gap-x-4"
            >
                <template v-for="stat of stats" :key="stat.label">
                    <dt
                        class="text-sm text-gray-900"
                        :class="{ 'dark:text-gray-200': index >= 3 }"
                    >
                        {{ stat.label }}
                    </dt>
                    <dd
                        class="font-bold text-gray-900"
                        :class="{ 'dark:text-gray-200': index >= 3 }"
                    >
                        {{ stat.value }}
                    </dd>
                </template>
            </dl>
        </div>

        <!-- Трофеи -->
        <div
            v-if="showAchievements && spirit.achievements?.length"
            class="flex justify-start gap-3 border-t border-gray-200 bg-gray-100/50 px-15 py-2 dark:bg-gray-100/10"
            :class="index < 3 ? 'dark:border-gray-300' : 'dark:border-gray-800'"
        >
            <achievement-badge
                v-for="achievement in spirit.achievements"
                :key="achievement.id"
                :achievement="achievement"
                size="lg"
                hint
            />
        </div>
    </div>
</template>
