<script setup lang="ts">
import { footerLinks } from '@/widgets/main-footer'
</script>

<template>
    <footer
        class="mt-auto flex w-full flex-col items-center justify-center gap-6 bg-[var(--ui-bg)] px-4 py-6 text-center text-xs text-gray-500 sm:flex-row sm:justify-center sm:gap-2"
    >
        <span>© Подземелья и коалы 2025. Все права защищены</span>

        <ul class="grid items-center gap-4 sm:flex sm:gap-2">
            <li
                v-for="link in footerLinks"
                :key="link.name"
                class="flex items-center gap-2"
            >
                <span class="hidden sm:inline">|</span>
                <a
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2"
                    :class="link.color ?? 'text-black dark:text-white'"
                >
                    <u-icon
                        v-if="link.icon"
                        :name="link.icon"
                        :ui="{
                            base: 'inline-flex',
                        }"
                        class="text-base"
                    />
                    {{ link.name }}
                </a>
            </li>
        </ul>
    </footer>
</template>
