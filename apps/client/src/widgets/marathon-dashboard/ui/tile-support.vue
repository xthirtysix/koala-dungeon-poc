<script setup lang="ts">
import DashboardTile from './dashboard-tile.vue'

defineProps<{
    name: string
    count: number
}>()

const BG_COLORS = `bg-green-100 dark:bg-green-700`
</script>

<template>
    <dashboard-tile>
        <template #header>
            <div class="mt-4 grid justify-items-center gap-2">
                <figure
                    :class="`flex size-12 items-center justify-center rounded-full ${BG_COLORS}`"
                >
                    <u-icon name="ph:hand-heart-duotone" class="size-8" />
                </figure>
                <p class="w-full truncate font-medium">Лучший в помощи</p>
            </div>
        </template>
        <div class="grid min-w-0 items-center justify-items-center gap-2">
            <p class="font-amatic mb-4 text-3xl font-bold">
                {{ name }}
            </p>
            <p :class="`rounded-full ${BG_COLORS} w-full truncate px-4 py-1`">
                Помощи оказано
            </p>
            <p class="font-amatic text-3xl font-bold">
                {{ count }}
            </p>
        </div>
    </dashboard-tile>
</template>
