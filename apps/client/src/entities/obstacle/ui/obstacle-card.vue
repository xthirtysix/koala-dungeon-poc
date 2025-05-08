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
            class="relative inset-0 z-10 grid bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-800"
        >
            <div
                class="absolute left-1/2 grid w-full -translate-x-1/2 -translate-y-1/2 transform items-center text-4xl text-gray-400"
            >
                <u-icon name="i-heroicons-lock-closed" class="mx-auto mb-2" />
                <p
                    class="text-center text-sm text-gray-500 italic dark:text-gray-400"
                >
                    Помеха еще не активирована
                </p>
            </div>
        </div>

        <template #header>
            <div class="relative min-h-[4rem] content-center">
                <h4 class="line-clamp-2 text-center text-2xl font-semibold">
                    {{ obstacle.name }}
                </h4>
                <u-badge
                    :color="getBadgeColor(obstacle.type)"
                    variant="subtle"
                    size="sm"
                    class="absolute -top-2 -right-2 md:-right-4"
                >
                    {{
                        typeOptions.find((t) => t.value === obstacle.type)
                            ?.label
                    }}
                </u-badge>
            </div>
        </template>

        <div class="flex h-[5rem] flex-1 items-center">
            <p
                v-if="obstacle.description && obstacle.isUnlocked"
                class="m-0 line-clamp-5 overflow-y-auto text-sm"
            >
                {{ obstacle.description }}
            </p>
        </div>
    </u-card>
</template>
