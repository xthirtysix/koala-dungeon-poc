<script setup lang="ts">
import { Dice, DiceIcon } from '@/shared/tools/dice'
import { ref } from 'vue'

interface Props {
    roll: {
        id: string
        timestamp: number
        rollResult: {
            result: number
            pool: Record<string, number[]>
            isAdvantage?: boolean
            isDisadvantage?: boolean
        }
    }
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'ascend-click', result: number): void
    (e: 'descend-click', result: number): void
}>()

const isPopoverOpened = ref<boolean>(false)

const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(timestamp))
}

const getDiceIcon = (dice: number) => {
    return DiceIcon[`D${dice}` as keyof typeof DiceIcon] || '🎲'
}

const getDiceName = (dice: number) => {
    return Dice[dice] || `d${dice}`
}

const getResultColorByRollType = (roll: any) => {
    if (roll.isNatural) return 'text-yellow-500'
    if (roll.isAdvantage) return 'text-green-400'
    if (roll.isDisadvantage) return 'text-red-400'

    return 'text-muted'
}

const getRemainingRoll = (roll: any) => {
    const maxDie = Math.max(...Object.keys(roll.pool || {}).map(Number))
    const values = (roll.pool && roll.pool[maxDie]) || []

    if (!Array.isArray(values) || values.length < 2) return null

    if (roll.isAdvantage) {
        return Math.min(...values)
    }

    if (roll.isDisadvantage) {
        return Math.max(...values)
    }

    return null
}

const getMaxDiceValue = (rollResult: any) => {
    if (!rollResult?.pool) return 0
    return Math.max(...Object.keys(rollResult.pool).map(Number))
}
</script>

<template>
    <u-card
        :ui="{
            root: 'relative overflow-hidden rounded-lg p-0',
            body: 'flex items-center gap-2 p-2 sm:p-2 sm:pr-4',
        }"
        @click="isPopoverOpened = true"
    >
        <u-icon
            class="relative z-1 flex h-11 w-11 items-center justify-center rounded-md bg-neutral-100 p-1.5 text-xl text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            :name="getDiceIcon(getMaxDiceValue(roll.rollResult))"
        />

        <div class="min-w-0">
            <p
                class="min-w-0 pb-0 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
                {{ getDiceName(getMaxDiceValue(roll.rollResult)) }}
            </p>
            <time
                :datetime="new Date(roll.timestamp).toISOString()"
                class="text-xs text-gray-400 dark:text-gray-500"
            >
                {{ formatTimestamp(roll.timestamp) }}
            </time>
        </div>

        <p class="ml-auto flex">
            <span
                class="font-amatic text-3xl font-bold"
                :class="getResultColorByRollType(roll.rollResult)"
            >
                {{ roll.rollResult.result }}
            </span>
            <span
                v-if="getRemainingRoll(roll.rollResult)"
                class="font-amatic text-2xl font-bold text-gray-500 dark:text-gray-400"
            >
                / {{ getRemainingRoll(roll.rollResult) }}
            </span>
        </p>
    </u-card>
</template>
