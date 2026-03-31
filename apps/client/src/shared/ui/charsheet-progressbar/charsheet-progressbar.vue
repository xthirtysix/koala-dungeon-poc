<script setup lang="ts">
import type {
    ProgressbarBackground,
    ProgressbarForeground,
} from '@/shared/model/colors.types'

withDefaults(
    defineProps<{
        value: number
        max: number
        color?: ProgressbarForeground
        backgroundColor?: ProgressbarBackground
    }>(),
    {
        color: '[&::-webkit-progress-value]:bg-green-500',
        backgroundColor: '[&::-webkit-progress-bar]:bg-green-100',
        value: 0,
        max: 100,
    },
)
</script>

<template>
    <progress
        :class="`dark:[&::-webkit-progress-bar]:bg-elevated relative h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-lg ${backgroundColor} ${color}`"
        :value="value"
        :max="max"
    />
</template>
