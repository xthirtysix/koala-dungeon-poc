<script setup lang="ts">
import {
    MapCell,
    zoneTypes,
    otherTypes,
    getCellGradientId,
} from '@/entities/cell'
import type { Cell } from '@/entities/cell'

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
        color: '#fdf6e3',
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
            <linearGradient :id="GLOSSY_ID" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fff" stop-opacity="0.7" />
                <stop offset="40%" stop-color="#fff" stop-opacity="0.15" />
                <stop offset="100%" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
            <!-- <filter
                id="checkpoint-glow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
            >
                <feGaussianBlur in="SourceGraphic" stdDeviation="2">
                    <animate
                        attributeName="stdDeviation"
                        values="2;6;2"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </feGaussianBlur>
            </filter>
            <filter
                id="checkpoint-shadow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
            >
                <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="8"
                    flood-color="#fde68a"
                    flood-opacity="0.5"
                >
                    <animate
                        attributeName="flood-opacity"
                        values="0.2;0.7;0.2"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </feDropShadow>
            </filter> -->
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
            :key="`cell-${idx}`"
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
