<script setup lang="ts">
import { AchievementBadge, type Achievement } from '@/entities/achievement'

defineProps<{
    achievement: Achievement
}>()
</script>

<template>
    <u-card
        tag="article"
        :ui="{ root: 'rounded-3xl', body: 'flex gap-4 p-2 sm:p-2' }"
    >
        <achievement-badge :achievement="achievement" side="top" size="lg" />
        <div class="grid gap-2">
            <h3 class="kd-h2 mb-2">{{ achievement.name }}</h3>
            <p class="text-sm text-gray-500">{{ achievement.description }}</p>
        </div>
    </u-card>
</template>
