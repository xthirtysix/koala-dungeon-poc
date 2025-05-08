<script setup>
import { computed } from 'vue'
import { Theme } from '@/widgets/main-header'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === Theme.DARK
    },
    set() {
        colorMode.value =
            colorMode.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
    },
})
</script>

<template>
    <client-only v-if="!colorMode?.forced">
        <u-button
            :icon="isDark ? 'i-lucide:moon' : 'i-lucide:sun'"
            color="neutral"
            variant="ghost"
            class="text-muted"
            @click="isDark = !isDark"
        />

        <template #fallback>
            <div class="size-8" />
        </template>
    </client-only>
</template>
