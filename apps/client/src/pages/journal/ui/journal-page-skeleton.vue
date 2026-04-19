<script setup lang="ts">
import { PAGE_SIZE } from '../consts/journal-page.consts';
import JournalListSkeleton from './journal-list-skeleton.vue'
</script>

<template>
    <div role="presentation">
        <u-skeleton class="mb-14 h-10 w-[110px]" />
        <u-skeleton class="mb-12 h-6 w-[75%]" />
        <u-skeleton class="mb-5 h-7 w-[60px]" />
        <journal-list-skeleton :count="PAGE_SIZE" />
    </div>
</template>
