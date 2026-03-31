<script setup lang="ts">
import { TechnologyCard, type Technology } from '@/widgets/technology-card'

defineProps<{
    title: string
    technologies: Technology[]
}>()
</script>

<template>
    <h2 class="kd-h2">{{ title }}</h2>

    <ul class="flex">
        <li v-for="technology in technologies" :key="technology.name">
            <technology-card :technology="technology" />
        </li>
    </ul>
</template>
