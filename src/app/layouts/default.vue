<template>
    <div class="max-w-[1400px] m-auto px-4 pb-8">
        <sidebar class="fixed w-[14rem]" />
        <div class="grid grid-cols-[12rem_1fr] mt-10 w-full gap-8">
            <UContainer class="mx-5 mb-5 col-start-2 max-w-[calc(100vw-14.5rem)] p-1 lg:p-1 m-0 lg:m-0 overflow-x-hidden">
                <UCard :ui="{ body: 'sm:p-[0.15rem]' }">
                    <slot />
                </UCard>
            </UContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sidebar } from '@/widgets/sidebar'
</script>
