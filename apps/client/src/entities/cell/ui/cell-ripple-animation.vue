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
    fill="none"
    :stroke="color"
    stroke-width="2"
    opacity="0.5"
  >
    <animate
      attributeName="r"
      :values="`${0.005 * 100}%;${0.012 * 100}%`"
      dur="1.8s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="opacity"
      values="0.5;0;0.5"
      dur="1.8s"
      repeatCount="indefinite"
    />
  </circle>
</template>
