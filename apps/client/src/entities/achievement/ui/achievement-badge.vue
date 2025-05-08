<script setup lang="ts">
import { type Achievement } from '@/entities/achievement'

defineProps<{
    achievement: Achievement
    side?: 'left' | 'right' | 'top' | 'bottom'
}>()
</script>

<template>
    <div class="flex gap-1">
        <u-popover mode="hover" :content="{ side }">
            <figure class="relative flex justify-center">
                <img
                    :src="achievement.image?.url"
                    :alt="achievement.name"
                    width="84"
                    class="w-[84px] object-contain"
                />
            </figure>

            <template #content>
                <div class="flex w-[300px] flex-col items-center gap-2 p-4">
                    <img
                        :src="achievement.image.url"
                        :alt="achievement.name"
                        width="200"
                        class="w-[200px] object-contain"
                    />
                    <h3 class="kd-h2 text-center">
                        {{ achievement.name }}
                    </h3>
                    <p
                        class="text-center text-sm text-gray-800 dark:text-gray-200"
                    >
                        {{ achievement.description }}
                    </p>
                </div>
            </template>
        </u-popover>
    </div>
</template>
