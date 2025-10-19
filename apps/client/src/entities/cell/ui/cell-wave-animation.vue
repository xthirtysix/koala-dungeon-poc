<script setup lang="ts">
defineProps<{
  cell: { x: number; y: number }
  idx: number
  color?: string
}>()
</script>

<template>
  <circle
    :cx="`${cell.x * 100}%`"
    :cy="`${cell.y * 100}%`"
    :stroke="color"
    stroke-width="3"
    fill="none"
  >
    <animate
      attributeName="r"
      :values="`${0.0055 * 100}%;${0.0075 * 100}%;${0.0055 * 100}%`"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>
</template>
