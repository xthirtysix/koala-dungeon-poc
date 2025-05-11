<script setup lang="ts">
import { MainHeader, useMainHeader } from '@/widgets/main-header'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { libraryPages } = useMainHeader()

const route = useRoute()
const isLibraryPage = computed(() => route.path.startsWith('/library'))
</script>

<template>
    <div class="layout grid min-h-screen w-full grid-rows-[auto,1fr]">
        <slot name="header" />

        <main class="layout__main relative py-8">
            <svg
                viewBox="0 0 1440 181"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="pointer-events-none absolute -top-px -z-10 w-full shrink-0 text-(--ui-primary) opacity-30 transition-all duration-[400ms]"
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
                <div class="layout__content grid gap-8 px-4">
                    <main>
                        <slot />
                    </main>
                </div>
            </div>
        </main>
        <footer
            class="mt-auto flex w-full flex-col items-center justify-center gap-2 border-t border-gray-200 py-6 text-xs text-gray-500 sm:flex-row sm:justify-center sm:gap-4 dark:border-gray-800"
        >
            <span>© Подземелья и коалы 2025. Все права защищены</span>
            <span class="hidden sm:inline">|</span>
            <a
                href="https://twitch.tv/aloekoala"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-violet-500 hover:underline"
            >
                <u-icon name="i-simple-icons:twitch" class="text-base" />
                twitch.tv/aloekoala
            </a>
            <span class="hidden text-gray-500 sm:inline">|</span>
            <a
                href="https://t.me/aloe_koala"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-blue-400 hover:underline"
            >
                <u-icon name="i-simple-icons:telegram" class="text-base" />
                @aloe_koala
            </a>
        </footer>
    </div>
</template>
