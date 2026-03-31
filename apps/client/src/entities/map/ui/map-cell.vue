<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { getCellColorByEvent, getCellEmojiByEvent } from '../lib/cell.utils'
import type { CellEvent } from '../model/cell.types'
import { useMapStore } from '../model/map.store'

const props = defineProps<{
    x: number
    y: number
    events: CellEvent[]
    idx: number
    noIcon?: boolean
    gradientId?: string
}>()

const { markedCells } = storeToRefs(useMapStore())

const cellIcon = computed(() => {
    if (props.noIcon) return null
    return getCellEmojiByEvent(props.events)
})

const isImageIcon = computed(() => {
    if (!cellIcon.value) return false
    return (
        cellIcon.value.includes('/') ||
        cellIcon.value.endsWith('.png') ||
        cellIcon.value.endsWith('.jpg') ||
        cellIcon.value.endsWith('.webp')
    )
})
</script>

<template>
    <g
        :id="`cell-${idx + 1}`"
        @click.self="$emit('cell-click', { cellNumber: idx })"
    >
        <circle
            :cx="`${x * 100}%`"
            :cy="`${y * 100}%`"
            :r="`${0.005 * 100}%`"
            :fill="getCellColorByEvent(events)"
            :stroke-width="3"
            stroke="var(--color-neutral-100)"
            class="hover:fill-primary-100 cursor-pointer duration-150"
        />
        <template v-if="markedCells.get(idx)">
            <text
                :x="`${x * 100}%`"
                :y="`${y * 100}%`"
                text-anchor="middle"
                dominant-baseline="middle"
                class="font-amatic pointer-events-none text-3xl font-bold select-none"
                fill="var(--color-black)"
            >
                {{ markedCells.get(idx) }}
            </text>
        </template>
        <template v-else-if="isImageIcon && cellIcon">
            <image
                :x="`${x * 100 - 2.5}%`"
                :y="`${y * 100 - 2.5}%`"
                :href="cellIcon"
                width="5%"
                height="5%"
                class="pointer-events-none select-none"
            />
        </template>
        <text
            v-else
            :x="`${x * 100}%`"
            :y="`${y * 100}%`"
            text-anchor="middle"
            dominant-baseline="middle"
            class="font-amatic pointer-events-none text-3xl font-bold select-none"
            fill="var(--color-black)"
        >
            {{ cellIcon || idx + 1 }}
        </text>
    </g>
</template>
