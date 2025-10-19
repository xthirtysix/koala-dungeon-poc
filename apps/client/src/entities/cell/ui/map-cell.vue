<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getCellColorByEvent, getCellEmojiByEvent } from '@/entities/cell'
import type { CellEvent } from '@/entities/cell'
import { useMapStore } from '@/entities/map'

defineProps<{
    x: number
    y: number
    events: CellEvent[]
    idx: number
    noIcon?: boolean
    gradientId?: string
}>()

const { markedCells } = storeToRefs(useMapStore())
</script>

<template>
    <g
        :id="`cell-${idx + 1}`"
        @click="$emit('cell-click', { cellNumber: idx })"
    >
        <circle
            :cx="`${x * 100}%`"
            :cy="`${y * 100}%`"
            :r="`${0.005 * 100}%`"
            class="cursor-pointer transition-all duration-150 hover:fill-cyan-400"
            :fill="
                gradientId ? `url(#${gradientId})` : getCellColorByEvent(events)
            "
            stroke="#fff"
            :stroke-width="3"
            @click="$emit('cell-click', { cellNumber: idx })"
        />
        <circle
            :cx="`${x * 100}%`"
            :cy="`${y * 100}%`"
            :r="`${0.005 * 100}%`"
            :fill="`url(#cell-glossy-gradient)`"
            pointer-events="none"
        >
        </circle>
        <text
            :x="`${x * 100}%`"
            :y="`${y * 100}%`"
            text-anchor="middle"
            dominant-baseline="middle"
            class="font-amatic pointer-events-none text-3xl font-bold select-none"
            fill="#000"
        >
            <template v-if="markedCells.get(idx)">
                {{ markedCells.get(idx) }}
            </template>
            <template v-else>
                {{ !noIcon ? getCellEmojiByEvent(events) || idx + 1 : idx + 1 }}
            </template>
        </text>
    </g>
</template>
