<script setup lang="ts">
import { MainFooter } from '@/widgets/main-footer'
</script>

<template>
    <div class="layout grid min-h-screen w-full grid-rows-[auto_1fr]">
        <slot name="header" />

        <main class="layout__main mb:2 relative -top-6 py-8 pt-12">
            <div class="container mx-auto max-w-7xl">
                <div class="layout__content grid gap-8 px-4">
                    <slot />
                </div>
            </div>
        </main>

        <main-footer />
    </div>
</template>
