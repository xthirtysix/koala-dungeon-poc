<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { STORAGE_KEY } from '../config/compact-toolbar.flag'

const isCompact = useStorage(STORAGE_KEY, false)
</script>

<template>
    <u-button
        :ui="{
            base: 'w-full cursor-pointer rounded-lg px-2',
            label: 'w-full text-left',
            leadingIcon: 'w-6 h-6 text-gray-500 dark:text-gray-400',
        }"
        :label="isCompact ? '' : 'Скрыть'"
        :icon="
            isCompact
                ? 'i-ph:sidebar'
                : 'i-ph:sidebar-simple'
        "
        variant="soft"
        color="neutral"
        @click="isCompact = !isCompact"
    />
</template>
