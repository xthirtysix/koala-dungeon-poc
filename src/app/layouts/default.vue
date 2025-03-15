<template>
    <sidebar class="fixed w-[12rem]" />
    <div class="grid grid-cols-[12rem_1fr] mt-10 w-full">
        <UContainer class="mx-5 mb-5 col-start-2 mw-[75vw]">
            <UCard :ui="{ body: 'sm:p-[0.15rem]' }">
                <slot />
            </UCard>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { sidebar } from '@/widgets/sidebar'
</script>
