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
            class="h-full absolute top-0 -left-20 bottom-0 object-cover max-w-full sm:max-w-none opacity-25 sm:opacity-65"
            :style="{
                maskImage: 'linear-gradient(to right, black 30%, transparent)',
                WebkitMaskImage:
                    'linear-gradient(to right, black 30%, transparent)',
            }"
        />
        <div
            class="text-xl p-2.5 w-15 flex items-center justify-center relative z-1"
            :class="{
                'rounded-lg shadow-inner': entry.hero === 'Нет',
                'bg-blue-50/35 dark:bg-orange-700/35': entry.type === 'dice',
                'bg-purple-50/35 dark:bg-purple-800/35':
                    entry.type === 'game' && entry.hero === 'Нет',
                'bg-yellow-50/35 dark:bg-emerald-800/35': entry.type === 'wheel',
                'bg-green-50/35 dark:bg-blue-700/35': entry.type === 'gift',
                'bg-orange-50/35 dark:bg-pink-900/35': entry.type === 'shop',
                'bg-red-50/35 dark:bg-amber-700/35': entry.type === 'boss',
                'bg-gray-50/35 dark:bg-gray-900/35': entry.type === 'system',
            }"
            :title="entry.type"
        >
            <span v-if="entry.hero === 'Нет'">{{
                getEventTypeIcon(entry.type)
            }}</span>
        </div>
        <div class="flex-1 relative z-1">
            <div class="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-2">
                <span
                    v-if="entry.time"
                    class="text-sm text-gray-600 dark:text-gray-300 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded"
                >
                    {{ formatDate(entry.time) }}
                </span>
                <span
                    v-if="entry.cell"
                    class="text-sm font-medium text-primary bg-primary/35 px-2 py-0.5 rounded"
                >
                    Клетка {{ entry.cell }}
                </span>
            </div>
            <p class="text-gray-700 dark:text-gray-200 mt-2 sm:mt-0">
                {{ entry.description }}
            </p>
        </div>
    </u-card>
</template>
