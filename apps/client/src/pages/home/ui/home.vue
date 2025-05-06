<script setup lang="ts">
import { MarathonTimer } from '@/widgets/marathon-timer'
import { HomeLatestWidget } from '@/widgets/home-latest'
</script>

<template>
    <h1 class="sr-only text-3xl font-bold">Марафон провинциальной стримерши</h1>

    <marathon-timer />

    <home-latest-widget class="mt-16" />
</template>
