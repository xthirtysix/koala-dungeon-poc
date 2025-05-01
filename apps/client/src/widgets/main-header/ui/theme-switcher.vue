<script setup>
import { Theme } from '../model/theme-model'

const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === Theme.DARK
    },
    set() {
        colorMode.preference =
            colorMode.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
    },
})
</script>

<template>
    <ClientOnly v-if="!colorMode?.forced">
        <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            @click="isDark = !isDark"
        />

        <template #fallback>
            <div class="size-8" />
        </template>
    </ClientOnly>
</template>
