<script setup lang="ts">
import { ref } from 'vue'
import tokenImage from '@/app/assets/images/token.webp'
import { Cell } from '@/entities/cell'

const tokenImg = tokenImage

withDefaults(
    defineProps<{
        currentCell: Cell
        tokenSize?: { width: number; height: number | string }
        displayName?: boolean
        playerName?: string
    }>(),
    {
        currentCell: () => ({ x: 0, y: 0 }),
        tokenSize: () => ({ width: 100, height: 'auto' }),
        displayName: false,
        playerName: undefined,
    },
)

const figure = ref<HTMLElement | null>(null)

defineExpose({ figure })
</script>

<template>
    <figure
        ref="figure"
        v-if="currentCell"
        class="pointer-events-auto absolute z-30 transition-transform duration-200 ease-in-out"
        :style="{
            transform: `translate3d(${currentCell.x - tokenSize.width / 2}px, ${currentCell.y - tokenSize.width}px, 0)`,
        }"
    >
        <img
            class="h-auto"
            :src="tokenImg"
            :width="tokenSize.width"
            :height="tokenSize.height"
            alt="Фишка игрока"
            draggable="false"
        />
        <figcaption
            v-if="displayName && playerName"
            class="font-amatic text-center text-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]"
        >
            {{ playerName }}
        </figcaption>
    </figure>
</template>
