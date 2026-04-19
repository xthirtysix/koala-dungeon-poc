<script setup lang="ts">
defineProps<{
    count: number
}>()
</script>

<template>
    <div class="grid grid-cols-3 gap-x-10 gap-y-[40px]">
        <u-skeleton v-for="i in count" :key="i" class="h-[28.625rem] rounded-3xl" />
    </div>
</template>
