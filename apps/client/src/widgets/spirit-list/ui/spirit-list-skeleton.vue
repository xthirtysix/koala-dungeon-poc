<template>
    <u-skeleton
        v-for="i in 7"
        :key="i"
        :class="expanded ? 'h-[11.5rem]' : 'h-[5rem]'"
        class="my-4 rounded-3xl"
    />
</template>

<script setup lang="ts">
defineProps<{
    expanded?: boolean
}>()
</script>
