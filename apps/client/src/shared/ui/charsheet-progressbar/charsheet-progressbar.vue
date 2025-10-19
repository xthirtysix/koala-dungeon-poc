<script setup lang="ts">
withDefaults(
    defineProps<{
        value: number
        max: number
        color?: string
    }>(),
    {
        color: 'green',
        value: 0,
        max: 100,
    },
)
</script>

<template>
    <progress
        :class="`relative h-4 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-${color}-100 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-${color}-500 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.15)_40%,rgba(255,255,255,0)_100%)]`"
        :value="value"
        :max="max"
    />
</template>
