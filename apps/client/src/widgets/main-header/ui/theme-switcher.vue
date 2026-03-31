<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { Theme } from '@/widgets/main-header'

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
    <u-button
        :icon="isDark ? 'i-ph:sun' : 'i-ph:moon-stars'"
        color="neutral"
        variant="ghost"
        class="rounded-xl hover:text-highlighted"
        @click="isDark = !isDark"
    />
</template>
