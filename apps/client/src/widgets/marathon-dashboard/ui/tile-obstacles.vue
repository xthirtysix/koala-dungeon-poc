<script setup lang="ts">
import DashboardTile from './dashboard-tile.vue'

defineProps<{
    name: string
    count: number
}>()

const BG_COLORS = `bg-red-100 dark:bg-red-700`
</script>

<template>
    <dashboard-tile color="red">
        <template #header>
            <div class="mt-4 grid justify-items-center gap-2">
                <figure
                    :class="`flex size-12 items-center justify-center rounded-full ${BG_COLORS}`"
                >
                    <u-icon name="ph:bomb-duotone" class="size-8" />
                </figure>
                <p class="font-medium truncate w-full">Лучший в помехах</p>
            </div>
        </template>
        <template class="grid items-center justify-items-center gap-2">
            <p class="font-amatic mb-4 text-3xl font-bold">
                {{ name }}
            </p>
            <p :class="`rounded-full ${BG_COLORS} truncate w-full px-4 py-1`">
                Помех создано
            </p>
            <p class="font-amatic text-3xl font-bold">
                {{ count }}
            </p>
        </template>
    </dashboard-tile>
</template>
