<script setup lang="ts">
import { MarathonTimer } from '@/widgets/marathon-timer'
import mapPlaceholder from '@/app/assets/images/map-placeholder.webp'
</script>

<template>
    <div class="my-auto grid h-auto w-full items-center justify-center gap-4">
        <img
            :src="mapPlaceholder"
            alt="Map Placeholder"
            class="mx-auto w-[200px] object-cover md:w-[300px]"
        />
        <marathon-timer />
    </div>
</template>
