<script setup lang="ts">
import { Achievement, AchievementBadge } from '@/entities/achievement'
</script>

<template>
    <div class="space-y-4">
        <u-card>
            <template #header>
                <h3 class="text-lg font-semibold">Награды</h3>
            </template>
            <div class="gap-4 grid grid-cols-5 justify-between align-middle">
                <achievement-badge
                    v-for="item in Achievement"
                    :key="item"
                    :type="item"
                />
            </div>
        </u-card>
    </div>
</template>

<style scoped></style>
