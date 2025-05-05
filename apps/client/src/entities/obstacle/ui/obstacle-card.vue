<script setup lang="ts">
import type { Obstacle, ObstacleType } from '../model/types'

defineProps<{
    obstacle: Obstacle
    isUnlocked: boolean
}>()

const typeOptions = [
    { label: 'Все', value: 'all' },
    { label: 'Одноразовая', value: 'одноразовая' },
    { label: 'Многоразовые', value: 'многоразовая' },
    { label: 'Событие', value: 'событие' },
    { label: 'Один раз за стрим', value: 'один раз за стрим' },
]

const getBadgeColor = (type: ObstacleType) => {
    switch (type) {
        case 'одноразовая':
            return 'error'
        case 'многоразовая':
            return 'success'
        case 'один раз за стрим':
            return 'info'
        case 'событие':
            return 'warning'
        default:
            return 'neutral'
    }
}
</script>

<template>
    <u-card
        :ui="{
            root: 'relative overflow-hidden h-full flex flex-col rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200',
        }"
    >
        <!-- Туман войны для неоткрытых помех -->
        <div
            v-if="!obstacle.description || !obstacle.isUnlocked"
            class="relative grid inset-0 bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-800 z-10"
        >
            <div
                class="absolute w-full left-1/2 grid items-center transform -translate-x-1/2 -translate-y-1/2 text-4xl text-gray-400"
            >
                <u-icon name="i-heroicons-lock-closed" class="mx-auto mb-2" />
                <p
                    class="text-sm text-center text-gray-500 dark:text-gray-400 italic"
                >
                    Помеха еще не активирована
                </p>
            </div>
        </div>

        <template #header>
            <div class="relative content-center min-h-[4rem]">
                <h4 class="text-xl font-semibold line-clamp-2">
                    {{ obstacle.name }}
                </h4>
                <u-badge
                    :color="getBadgeColor(obstacle.type)"
                    variant="subtle"
                    size="sm"
                    class="absolute -top-2 -right-4"
                >
                    {{
                        typeOptions.find((t) => t.value === obstacle.type)
                            ?.label
                    }}
                </u-badge>
            </div>
        </template>

        <div class="flex-1 flex items-center h-[5rem]">
            <p
                v-if="obstacle.description && obstacle.isUnlocked"
                class="text-sm overflow-y-auto m-0"
            >
                {{ obstacle.description }}
            </p>
        </div>
    </u-card>
</template>
