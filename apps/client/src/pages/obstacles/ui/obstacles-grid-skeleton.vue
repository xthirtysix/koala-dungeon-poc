<script setup lang="ts">
defineProps<{
    count: number
}>()
</script>
<template>
    <div class="grid grid-cols-3 gap-x-10 gap-y-[40px]">
        <u-skeleton v-for="i in count" :key="i" class="h-[4.5rem] rounded-3xl" />
    </div>
</template>
