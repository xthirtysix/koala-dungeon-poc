<script setup lang="ts">
import type { Obstacle, ObstacleType } from '../model/types'

const props = defineProps<{
    obstacle: Obstacle
    isUnlocked: boolean
}>()

const typeOptions = [
    { label: 'Все', value: 'all' },
    { label: 'Одноразовые', value: 'once' },
    { label: 'Многоразовые', value: 'reusable' },
    { label: 'Событие', value: 'event' },
    { label: 'Стримовые', value: 'stream' },
]

const getBadgeColor = (type: ObstacleType) => {
    switch (type) {
        case 'once':
            return 'error'
        case 'reusable':
            return 'success'
        case 'stream':
            return 'info'
        case 'event':
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
            v-if="!obstacle.description"
            class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-800 z-10"
        >
            <u-icon
                name="i-heroicons-lock-closed"
                class="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-gray-400"
            />
        </div>

        <template #header>
            <div class="relative content-center min-h-[4rem]">
                <h4 class="text-md font-semibold line-clamp-2">
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

        <div class="flex-1 flex items-center">
            <p
                v-if="obstacle.description"
                class="text-sm overflow-y-auto m-0 h-[5rem]"
            >
                {{ obstacle.description }}
            </p>
            <p v-else class="text-sm text-gray-500 dark:text-gray-400 italic">
                Помеха еще не активирована
            </p>
        </div>
    </u-card>
</template>
