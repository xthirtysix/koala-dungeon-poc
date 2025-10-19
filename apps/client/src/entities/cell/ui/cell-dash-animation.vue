<script setup lang="ts">
import { useVisibleInViewport } from '@/shared/composables/useVisibleInViewport'

defineProps<{
  cell: { x: number; y: number }
  idx: number
  color?: string
}>()

const { el, isVisible } = useVisibleInViewport<SVGCircleElement>()
</script>

<template>
  <circle
    ref="el"
    :stroke="color"
    :cx="`${cell.x * 100}%`"
    :cy="`${cell.y * 100}%`"
    :r="`${0.0065 * 100}%`"
    fill="none"
    stroke-width="3"
    stroke-dasharray="6 6"
  >
    <template v-if="isVisible">
      <animate
        attributeName="stroke-dashoffset"
        values="0;12"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </template>
  </circle>
</template>
