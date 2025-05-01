<script setup lang="ts">
import type { ArtefactStats } from '@/entities/artefact'

interface Props {
    stat: keyof ArtefactStats
    value: number
}

defineProps<Props>()

const getStatIcon = (stat: keyof ArtefactStats): string => {
    const icons: Record<keyof ArtefactStats, string> = {
        strength: 'i-game-icons-biceps',
        dexterity: 'i-game-icons-body-balance',
        constitution: 'i-game-icons-muscular-torso',
        wisdom: 'i-game-icons-barn-owl',
    }
    return icons[stat]
}

const getStatLabel = (stat: keyof ArtefactStats): string => {
    const labels: Record<keyof ArtefactStats, string> = {
        strength: 'Сила',
        dexterity: 'Ловкость',
        constitution: 'Телосложение',
        wisdom: 'Мудрость',
    }
    return labels[stat]
}

const getStatValueClass = (value: number): string => {
    return value >= 0
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-red-600 dark:text-red-400'
}

const formatValue = (value: number): string => {
    return value > 0 ? '+' + value : value.toString()
}
</script>

<template>
    <div class="stat-badge flex items-center text-sm gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
        <UIcon :name="getStatIcon(stat)" class="text-lgtext-gray-700 dark:text-gray-300" />
        <span class="text-gray-700 dark:text-gray-300">{{ getStatLabel(stat) }}: </span>
        <span :class="getStatValueClass(value)">{{ formatValue(value) }}</span>
    </div>
</template>
