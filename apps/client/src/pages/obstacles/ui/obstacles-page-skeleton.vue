<script setup lang="ts">
import { PAGE_SIZE } from '../consts/obstacles-page.consts';
import ObstaclesGridSkeleton from './obstacles-grid-skeleton.vue'
</script>

<template>
    <div role="presentation">
        <u-skeleton class="mb-12 h-10 w-[80px]" />
        <u-skeleton class="mb-9 h-8 w-[70px]" />
        <obstacles-grid-skeleton :count="PAGE_SIZE" />
    </div>
</template>
