<script setup lang="ts">
interface Props {
    value: number
}

defineProps<Props>()

const formatValue = (value: number): string => {
    return value === Infinity ? '∞' : value.toString()
}
</script>

<template>
    <div class="durability-badge text-sm flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded">
        <u-icon name="i-game-icons:broken-shield" class="text-gray-700 dark:text-gray-300" />
        <span class="text-gray-700 dark:text-gray-300">Хрупкость: {{ formatValue(value) }}</span>
    </div>
</template>
