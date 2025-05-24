<script setup lang="ts">
import { computed } from 'vue'
import { DiceIcon } from '@/entities/dice'

const props = defineProps<{
    dice: 4 | 6 | 8 | 10 | 12 | 20
}>()

const emit = defineEmits<{
    (e: 'rollDice', value: number): void
}>()

const diceIcon = computed<string>(() => DiceIcon[`D${props.dice}`])

function onRollDice() {
    emit('rollDice', Math.floor(Math.random() * props.dice) + 1)
}
</script>

<template>
    <button
        @click="onRollDice"
        class="flex inline-block items-center gap-2 rounded-lg bg-gray-100 p-2 text-primary dark:bg-gray-800 dark:text-primary"
    >
        <u-icon :name="diceIcon" class="size-10" />
    </button>
</template>
