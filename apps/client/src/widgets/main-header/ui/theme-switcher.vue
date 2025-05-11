<script setup>
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
        :icon="isDark ? 'i-lucide:moon' : 'i-lucide:sun'"
        color="neutral"
        variant="ghost"
        class="text-muted"
        @click="isDark = !isDark"
    />
</template>
