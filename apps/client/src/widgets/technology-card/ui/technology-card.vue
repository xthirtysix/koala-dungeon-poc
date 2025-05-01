<script setup lang="ts">
import type { Technology } from '@/widgets/technology-card'

defineProps<{
    technology: Technology
}>()

defineOptions({
    name: 'TechnologyCard',
})
</script>

<template>
    <u-card
        :style="{
            backgroundColor: `${technology.color}1A`,
        }"
        :ui="{ body: 'p-4 sm:p-4' }"
    >
        <div class="flex items-center gap-2">
            <u-icon
                :name="technology.icon"
                class="text-xl"
                :style="{ color: technology.color }"
            />
            <span>{{ technology.name }}</span>
        </div>
    </u-card>
</template>
