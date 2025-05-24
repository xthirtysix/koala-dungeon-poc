<script setup lang="ts">
import { Dice } from '@/entities/dice'
import {
    type RollResult,
    rollDice,
    rollDiceWithAdvantage,
    rollDiceWithDisadvantage,
    rollDicePool,
} from '@/features/dice'

const emit = defineEmits<{
    (e: 'roll', result: RollResult): void
}>()

const props = defineProps<{
    dice: Dice | Partial<Record<Dice, number>>
    advantage?: boolean
    disadvantage?: boolean
}>()

function onClick() {
    if (typeof props.dice === 'object') {
        emit('roll', rollDicePool(props.dice))
        return
    }

    if (props.advantage) {
        emit('roll', rollDiceWithAdvantage(props.dice))
    } else if (props.disadvantage) {
        emit('roll', rollDiceWithDisadvantage(props.dice))
    } else {
        emit('roll', rollDice(props.dice))
    }
}
</script>

<template>
    <u-button @click="onClick" v-bind="$attrs" />
</template>
