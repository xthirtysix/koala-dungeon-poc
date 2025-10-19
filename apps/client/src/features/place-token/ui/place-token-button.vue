<script setup lang="ts">
import { useUserStore } from '@/entities/user'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())

const emit = defineEmits<{
    (e: 'click'): void
}>()

const handleClick = () => {
    emit('click')
}
</script>

<template>
    <u-button
        v-if="user"
        icon="i-fluent-emoji-high-contrast:paw-prints"
        color="neutral"
        variant="solid"
        class="gray-800 relative z-1 ml-2 flex h-14 w-14 transform items-center justify-center overflow-hidden rounded-full bg-gray-300 p-0 text-2xl drop-shadow transition-transform duration-250 hover:bg-gray-300 active:bg-gray-400 [&>svg]:fill-black [&>svg]:text-black"
        @click="handleClick"
    >
        <div
            class="kd-gradient pointer-events-none absolute top-0 left-0 h-4 w-full rounded-full"
        />
    </u-button>
</template>
