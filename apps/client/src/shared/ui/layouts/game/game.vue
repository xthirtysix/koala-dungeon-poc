<script setup lang="ts">
import { MainFooter } from '@/widgets/main-footer'
</script>

<template>
    <div class="layout grid min-h-screen w-full grid-rows-[auto_1fr]">
        <slot name="header" />

        <main class="layout__main relative flex flex-col pt-3 pb-8">
            <div class="mx-auto flex w-full max-w-[1600px] flex-1">
                <div
                    class="layout__content grid flex-1 grid-rows-[1fr] gap-8 px-4"
                >
                    <slot />
                </div>
            </div>
        </main>

        <main-footer
            class="!none right-0 bottom-0 z-200 !w-auto rounded-tl-lg border-l border-t border-t-gray-200 dark:border-t-gray-800 border-l-gray-200 !py-1 md:!fixed dark:border-l-gray-800"
        />
    </div>
</template>
