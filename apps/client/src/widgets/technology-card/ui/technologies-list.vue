<script setup lang="ts">
import { TechnologyCard, type Technology } from '@/widgets/technology-card'

defineProps<{
    title: string
    technologies: Technology[]
}>()
</script>

<template>
    <h2 class="kd-h2">{{ title }}</h2>

    <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <li v-for="technology in technologies" :key="technology.name">
            <technology-card :technology="technology" />
        </li>
    </ul>
</template>
