<script setup lang="ts">
import type { ArtefactBonus } from '@/entities/artefact'

defineProps<{
    characteristic: string
    value: number
    isNegative: boolean
}>()

const getStatIcon = (characteristic): string => {
    const icons = {
        'сила': 'i-game-icons-biceps',
        'ловкость': 'i-game-icons-body-balance',
        'телосложение': 'i-game-icons-muscular-torso',
        'мудрость': 'i-game-icons-barn-owl',
    }
    return icons[characteristic]
}

const getStatValueClass = (isNegative: boolean): string => {
    return isNegative
        ? 'text-red-600 capitalize dark:text-red-400'
        : 'text-emerald-600 capitalize dark:text-emerald-400'
}

const formatValue = (value: number): string => {
    return value > 0 ? '+' + value : value.toString()
}
</script>

<template>
    <div
        class="stat-badge flex items-center text-sm gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded"
    >
        <u-icon
            :name="getStatIcon(characteristic)"
            mode="css"
            class="text-lgtext-gray-700 dark:text-gray-300"
        />
        <span class="text-gray-700 capitalize dark:text-gray-300"
            >{{ characteristic }}:
        </span>
        <span :class="getStatValueClass(isNegative)">{{
            isNegative ? value * -1 : value
        }}</span>
    </div>
</template>
