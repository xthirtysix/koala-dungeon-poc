<script setup lang="ts">
import { MainHeader, useMainHeader } from '@/widgets/main-header'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { libraryPages } = useMainHeader()

const route = useRoute()
const isLibraryPage = computed(() => route.path.startsWith('/library'))
</script>

<template>
    <div class="layout w-full">
        <main-header class="w-full max-w-auto mx-auto" />

        <main class="layout__main relative">
            <svg
                viewBox="0 0 1440 181"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="pointer-events-none absolute w-full -top-px transition-all text-(--ui-primary) shrink-0 -z-10 opacity-30 duration-[400ms]"
                style=""
            >
                <mask id="path-1-inside-1_414_5526" fill="white">
                    <path d="M0 0H1440V181H0V0Z"></path>
                </mask>
                <path
                    d="M0 0H1440V181H0V0Z"
                    fill="url(#paint0_linear_414_5526)"
                    fill-opacity="0.22"
                ></path>
                <path
                    d="M0 2H1440V-2H0V2Z"
                    fill="url(#paint1_linear_414_5526)"
                    mask="url(#path-1-inside-1_414_5526)"
                ></path>
                <defs>
                    <linearGradient
                        id="paint0_linear_414_5526"
                        x1="720"
                        y1="0"
                        x2="720"
                        y2="181"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="currentColor"></stop>
                        <stop
                            offset="1"
                            stop-color="currentColor"
                            stop-opacity="0"
                        ></stop>
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_414_5526"
                        x1="0"
                        y1="90.5"
                        x2="1440"
                        y2="90.5"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="currentColor" stop-opacity="0"></stop>
                        <stop offset="0.395" stop-color="currentColor"></stop>
                        <stop
                            offset="1"
                            stop-color="currentColor"
                            stop-opacity="0"
                        ></stop>
                    </linearGradient>
                </defs>
            </svg>
            <div class="container mx-auto max-w-7xl">
                <div class="layout__content">
                    <!-- <aside v-if="isLibraryPage" class="layout__sidebar">
                        <u-card>
                            <u-navigation-menu
                                orientation="vertical"
                                :items="libraryPages"
                                :ui="{ item: 'py-3' }"
                            />
                        </u-card>
                    </aside> -->
                    <div
                        class="layout__page"
                        :class="{ 'layout__page--full': !isLibraryPage }"
                    >
                        <main>
                            <slot />
                        </main>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.layout {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
}

.layout__main {
    padding: 2rem 0;
}

.layout__content {
    display: grid;
    gap: 2rem;
}

.layout__content:has(.layout__sidebar) {
    grid-template-columns: 250px 1fr;
}

.layout__sidebar {
    padding: 1rem;
    border-radius: 0.5rem;
    height: fit-content;
}

.layout__page {
    padding: 1rem;
    min-height: 500px;
}

.layout__page--full {
    grid-column: 1 / -1;
}
</style>
