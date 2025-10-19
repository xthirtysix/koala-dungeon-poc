<script setup lang="ts">
import durabilityIcon from '@/app/assets/images/characteristics/curse_icon.png'

defineProps<{ value: number }>()

const formatValue = (value: number): string => {
    return value ? `Прочность ${value.toString()}` : 'Не ломается'
}
</script>

<template>
    <div class="durability-badge flex items-center gap-1 rounded p-0">
        <img :src="durabilityIcon" alt="Прочность" class="h-8 w-8" />
        <slot name="label">
            <span
                class="font-amatic text-2xl font-bold text-gray-700 uppercase dark:text-white"
            >
                {{ formatValue(value) }}
            </span>
        </slot>
    </div>
</template>
