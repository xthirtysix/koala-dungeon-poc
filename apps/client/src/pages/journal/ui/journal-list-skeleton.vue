<script setup lang="ts">
defineProps<{
    count: number
}>()
</script>

<template>
    <div class="grid gap-y-4">
        <u-skeleton v-for="i in count" :key="i" class="h-16 rounded-lg" />
    </div>
</template>
