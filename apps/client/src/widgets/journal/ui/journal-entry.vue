<script setup lang="ts">
import { computed } from 'vue'
import type { JournalEntry } from '@/entities/journal'
import { colorByJournalEntryType, heroImageByName } from '@/widgets/journal'

interface Props {
    entry: JournalEntry
}

const props = defineProps<Props>()

const hasHero = computed<boolean>(
    () => 'hero' in props.entry && props.entry.hero !== 'Нет',
)

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

const badgeBackground = computed<string>(() => {
    if ('hero' in props.entry && props.entry.hero === 'Heт') {
        return 'bg-blue-100/40 dark:bg-blue-300/40'
    }

    return `bg-${colorByJournalEntryType.get(props.entry.type)}-100/40 dark:bg-${colorByJournalEntryType.get(props.entry.type)}-300/40`
})
</script>

<template>
    <u-card
        :ui="{
            root: 'relative overflow-hidden rounded-3xl bg-stone-50/20 p-0 shadow-md duration-200 hover:shadow-md',
            body: 'flex items-start gap-3 p-4 sm:p-2',
        }"
    >
        <div
            class="kd-gradient pointer-events-none absolute top-0 left-0 h-4 w-full rounded-lg opacity-15"
        />
        <img
            v-if="hasHero"
            :src="heroImageByName.get('hero' in entry ? entry.hero : '')"
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
                [`rounded-2xl shadow-inner ${badgeBackground}`]: !hasHero,
            }"
            :title="entry.type"
        >
            <span v-if="!hasHero">
                {{ getEventTypeIcon(entry.type) }}
            </span>
        </div>
        <div class="relative z-1 flex-1">
            <div
                class="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-2"
            >
                <span
                    v-if="entry.time || entry.createdAt"
                    class="rounded-full bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-600 dark:bg-gray-900/35 dark:text-gray-300"
                >
                    {{ formatDate(entry.time || entry.createdAt) }}
                </span>
                <span
                    v-if="entry.cell"
                    class="bg-primary/35 text-primary rounded-full px-2 py-0.5 text-sm font-medium"
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
