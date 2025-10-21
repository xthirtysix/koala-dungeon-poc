<script setup lang="ts">
import { Dice, DiceIcon } from '@/entities/dice'
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

const getDiceIconBgColor = (roll: any) => {
    if (roll.isAdvantage) return 'bg-green-100/40 dark:bg-green-300/40'
    if (roll.isDisadvantage) return 'bg-red-100/40 dark:bg-red-300/40'

    return 'bg-blue-100/40 dark:bg-blue-300/40'
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
            root: 'relative overflow-hidden rounded-2xl bg-stone-50/20 p-0 shadow-sm duration-200 hover:shadow-md',
            body: 'flex items-start gap-2 p-2 sm:p-2 sm:pr-4',
        }"
        @click="isPopoverOpened = true"
    >
        <u-icon
            class="relative z-1 flex h-12 w-12 items-center justify-center rounded-xl p-1.5 text-xl shadow-inner"
            :class="getDiceIconBgColor(roll.rollResult)"
            :name="getDiceIcon(getMaxDiceValue(roll.rollResult))"
        />

        <div class="min-w-0">
            <p
                class="min-w-0 pb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
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

        <div
            class="ml-auto grid justify-end self-center text-right leading-tight"
        >
            <span
                class="text-xl font-bold text-gray-900 sm:text-xl dark:text-gray-100"
            >
                {{ roll.rollResult.result }}
            </span>
            <span
                v-if="getRemainingRoll(roll.rollResult)"
                class="text-sm text-gray-500 dark:text-gray-400"
            >
                {{ getRemainingRoll(roll.rollResult) }}
            </span>
        </div>
    </u-card>
</template>
