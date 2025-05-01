<script setup lang="ts">
import {
    achievementNameByType,
    achievementPathByType,
    achievementDescriptionByType,
    type Achievement,
} from '@/entities/achievement'

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
                    :src="`${achievementPathByType.get(achievement)}`"
                    :alt="`${achievementNameByType.get(achievement)}`"
                    width="84"
                    class="w-[84px] object-contain"
                >
            </figure>

            <template #content>
                <div class="p-4 flex flex-col items-center gap-2 w-[300px]">
                    <img
                        :src="`${achievementPathByType.get(achievement)}`"
                        :alt="`${achievementNameByType.get(achievement)}`"
                        width="200"
                        class="w-[200px] object-contain"
                    >
                    <h3 class="text-lg font-semibold text-center">
                        {{ achievementNameByType.get(achievement) }}
                    </h3>
                    <p class="text-sm text-gray-600 text-center">
                        {{ achievementDescriptionByType.get(achievement) }}
                    </p>
                </div>
            </template>
        </u-popover>
    </div>
</template>
