<script setup lang="ts">
import { type Achievement } from '@/entities/achievement'

withDefaults(
    defineProps<{
        achievement: Achievement
        side?: 'left' | 'right' | 'top' | 'bottom'
        size?: 'md' | 'lg'
        hint?: boolean
    }>(),
    {
        size: 'md',
    },
)
</script>

<template>
    <div class="flex gap-1">
        <u-popover
            v-if="hint"
            :content="{ side }"
            :ui="{
                content:
                    'flex w-[300px] flex-col items-center gap-2 rounded-3xl p-4',
            }"
        >
            <figure class="relative flex cursor-help justify-center">
                <img
                    :src="achievement.image?.url"
                    :alt="achievement.name"
                    :width="size === 'md' ? 84 : 100"
                    :class="size === 'md' ? 'w-[84px]' : 'w-[100px]'"
                    class="object-contain"
                />
            </figure>

            <template #content>
                <img
                    :src="achievement.image.url"
                    :alt="achievement.name"
                    width="200"
                    class="w-[200px] object-contain"
                />
                <h3 class="kd-h2 text-center">
                    {{ achievement.name }}
                </h3>
                <p class="text-center text-sm text-gray-800 dark:text-gray-200">
                    {{ achievement.description }}
                </p>
            </template>
        </u-popover>

        <figure v-else class="relative flex cursor-help justify-center">
            <img
                :src="achievement.image?.url"
                :alt="achievement.name"
                :width="size === 'md' ? 84 : 120"
                :class="size === 'md' ? 'w-[84px]' : 'w-[120px]'"
                class="object-contain"
            />
        </figure>
    </div>
</template>
