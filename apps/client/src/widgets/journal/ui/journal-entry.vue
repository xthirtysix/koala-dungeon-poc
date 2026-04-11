<script setup lang="ts">
import { computed } from 'vue'
import { bgHeroesData, type JournalEntry } from '@/entities/journal'
import { BG_BY_TYPE } from '../consts/journal-colors.consts'
import {
    FALLBACK_EVENT_ICON,
    ICON_BY_EVENT_TYPE,
} from '../consts/journal-icons.consts'

interface Props {
    entry: JournalEntry
}

const props = defineProps<Props>()

const heroImageByName = new Map(
    bgHeroesData.map(({ name, image }) => [name, image]),
)

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

const badgeBackground = computed(() => {
    if ('hero' in props.entry && props.entry.hero === 'Heт') {
        return 'bg-blue-100/40 dark:bg-blue-300/40'
    }

    return BG_BY_TYPE.get(props.entry.type)
})
</script>

<template>
    <u-card
        :ui="{
            root: 'relative overflow-hidden rounded-xl bg-gray-50/20 p-0 shadow-sm duration-200 hover:shadow-md ring-1 ring-gray-100 dark:ring-gray-600',
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
                [`rounded-lg inset-shadow-sm inset-shadow-gray-100 dark:inset-shadow-gray-800 ${badgeBackground}`]:
                    !hasHero,
            }"
            :title="entry.type"
        >
            <span v-if="!hasHero">
                {{ ICON_BY_EVENT_TYPE.get(entry.type) ?? FALLBACK_EVENT_ICON }}
            </span>
        </div>
        <div class="relative z-1 flex-1">
            <div
                class="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-2"
            >
                <u-badge
                    v-if="entry.time || entry.createdAt"
                    variant="subtle"
                    color="neutral"
                    :label="formatDate(entry.time || entry.createdAt)"
                />
                <u-badge
                    v-if="entry.cell"
                    variant="subtle"
                    color="primary"
                    :label="` Клетка ${entry.cell} `"
                />
            </div>
            <p class="mt-2 text-gray-700 sm:mt-0 dark:text-gray-200">
                {{ entry.description }}
            </p>
        </div>
    </u-card>
</template>
