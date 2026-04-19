<script setup lang="ts">
import { SKELETON_COUNT } from '../consts/artefacts-page.consts';
import ArtefactsGridSkeleton from './artefacts-grid-skeleton.vue'
</script>

<template>
    <div role="presentation">
        <u-skeleton class="mb-19 h-10 w-[110px]" />
        <artefacts-grid-skeleton :count="SKELETON_COUNT" />
    </div>
</template>
