<script setup lang="ts">
defineProps<{
  cell: { x: number; y: number }
  idx: number
  color?: string
}>()
</script>

<template>
  <g>
    <defs>
      <filter :id="`glow-${idx}`" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4">
          <animate attributeName="stdDeviation" values="2;6;2" dur="2s" repeatCount="indefinite" />
        </feGaussianBlur>
        <feMerge>
          <feMergeNode />
          <feMergeNode />
        </feMerge>
      </filter>
    </defs>
    <circle
      :cx="`${cell.x * 100}%`"
      :cy="`${cell.y * 100}%`"
      :r="`${0.0055 * 100}%`"
      :stroke="color"
      stroke-width="3"
      fill="none"
      :filter="`url(#glow-${idx})`"
      opacity="0.7"
    />
  </g>
</template>
