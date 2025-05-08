<script setup lang="ts">
import type { JournalEntry } from '@/entities/journal'
import { heroImageByName } from '@/widgets/journal'

interface Props {
    entry: JournalEntry
}

defineProps<Props>()

const formatDate = (timestamp: number | string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}

const getEventTypeIcon = (type: JournalEntry['type']) => {
    switch (type) {
        case 'dice':
            return '🎲'
        case 'game':
            return '🎮'
        case 'wheel':
            return '🎡'
        case 'gift':
            return '🎁'
        case 'shop':
            return '🏪'
        case 'boss':
            return '👾'
        case 'system':
            return '⚙️'
        default:
            return '📝'
    }
}
</script>

<template>
    <u-card
        :ui="{
            root: 'relative overflow-hidden rounded-lg p-0 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200',
            body: 'flex items-start gap-3 p-4 sm:p-2',
        }"
    >
        <img
            v-if="entry.hero"
            :src="heroImageByName.get(entry.hero)"
            class="absolute top-0 bottom-0 -left-20 h-full max-w-full object-cover opacity-25 sm:max-w-none sm:opacity-65"
            :style="{
                maskImage: 'linear-gradient(to right, black 30%, transparent)',
                WebkitMaskImage:
                    'linear-gradient(to right, black 30%, transparent)',
            }"
        />
        <div
            class="relative z-1 flex w-15 items-center justify-center p-2.5 text-xl"
            :class="{
                'rounded-lg shadow-inner': entry.hero === 'Нет',
                'bg-blue-50/35 dark:bg-orange-700/35': entry.type === 'dice',
                'bg-purple-50/35 dark:bg-purple-800/35':
                    entry.type === 'game' && entry.hero === 'Нет',
                'bg-yellow-50/35 dark:bg-emerald-800/35':
                    entry.type === 'wheel',
                'bg-green-50/35 dark:bg-blue-700/35': entry.type === 'gift',
                'bg-orange-50/35 dark:bg-pink-900/35': entry.type === 'shop',
                'bg-red-50/35 dark:bg-amber-700/35': entry.type === 'boss',
                'bg-gray-50/35 dark:bg-gray-900/35': entry.type === 'system',
            }"
            :title="entry.type"
        >
            <span v-if="entry.hero === 'Нет' || !entry.hero">
                {{ getEventTypeIcon(entry.type) }}
            </span>
        </div>
        <div class="relative z-1 flex-1">
            <div
                class="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-2"
            >
                <span
                    v-if="entry.time"
                    class="rounded bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                    {{ formatDate(entry.time) }}
                </span>
                <span
                    v-if="entry.cell"
                    class="text-primary bg-primary/35 rounded px-2 py-0.5 text-sm font-medium"
                >
                    Клетка {{ entry.cell }}
                </span>
            </div>
            <p class="mt-2 text-gray-700 sm:mt-0 dark:text-gray-200">
                {{ entry.description }}
            </p>
        </div>
    </u-card>
</template>
