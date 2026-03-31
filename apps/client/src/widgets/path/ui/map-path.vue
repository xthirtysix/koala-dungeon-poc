<script setup lang="ts">
import {
    MapCell,
    zoneTypes,
    otherTypes,
    getCellGradientId,
    type Cell,
} from '@/entities/map'

const GLOSSY_ID = 'cell-glossy-gradient'

withDefaults(
    defineProps<{
        path: Cell[]
        width: number
        height: number
        color?: string
        strokeWidth?: number
    }>(),
    {
        color: 'var(--color-neutral-100)',
        strokeWidth: 10,
    },
)

defineEmits<{
    (e: 'cell-click', payload: { cellNumber: number }): void
}>()
</script>

<template>
    <svg :width="width" :height="height">
        <defs>
            <template v-for="zone in zoneTypes">
                <template v-for="other in otherTypes">
                    <linearGradient
                        :id="`gradient-${other.key}-${zone.key}`"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                    >
                        <stop offset="0%" :stop-color="other.color" />
                        <stop offset="50%" :stop-color="other.color" />
                        <stop offset="50%" :stop-color="zone.color" />
                        <stop offset="100%" :stop-color="zone.color" />
                    </linearGradient>
                </template>
            </template>
        </defs>
        <polyline
            v-if="path.length > 1"
            :points="
                path.map((c) => `${c.x * width},${c.y * height}`).join(' ')
            "
            :stroke="color"
            :stroke-width="strokeWidth || 10"
            fill="none"
        />
        <map-cell
            v-for="(cell, idx) in path"
            :key="`cell-${cell.x}-${cell.y}`"
            :data-events="cell.events?.[0]?.type"
            :events="cell.events || [{ type: null }]"
            :x="cell.x"
            :y="cell.y"
            :idx="idx"
            :color="color"
            :gradient-id="getCellGradientId(cell.events || [])"
            :glossy-id="GLOSSY_ID"
            @click="$emit('cell-click', { cellNumber: idx })"
        />
    </svg>
</template>
