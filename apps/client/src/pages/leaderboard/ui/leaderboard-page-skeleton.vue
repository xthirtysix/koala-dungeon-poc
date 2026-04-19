<script setup lang="ts">
import { SpiritListSkeleton } from '@/widgets/spirit-list'
</script>

<template>
    <div role="presentation">
        <div class="mb-18 flex items-end justify-between">
            <u-skeleton class="h-10 w-[110px]" />
            <u-skeleton class="h-9 w-[100px] rounded-full" />
        </div>
        <u-skeleton class="mb-11 h-8 w-[80px]" />
        <div class="mb-24 grid grid-cols-3 gap-x-6 gap-y-[40px]">
            <u-skeleton v-for="i in 3" :key="i" class="h-[30rem] rounded-3xl" />
        </div>
        <div class="mb-2 flex items-center justify-between">
            <u-skeleton class="h-8 w-[120px]" />
            <u-skeleton class="h-7 w-[180px]" />
        </div>
        <u-skeleton
            v-for="i in 3"
            :key="i"
            class="mb-4 h-[11.3rem] rounded-3xl"
        />
        <spirit-list-skeleton />
    </div>
</template>
