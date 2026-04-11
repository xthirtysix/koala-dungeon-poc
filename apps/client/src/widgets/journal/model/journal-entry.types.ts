import { TailwindColor } from '@/shared/model/colors.types'

export type JournalEntryColor = Extract<
    TailwindColor,
    'violet' | 'blue' | 'yellow' | 'green' | 'orange' | 'red' | 'gray'
>

export type JournalBadgeBackground =
    `bg-${JournalEntryColor}-200/40 dark:bg-${JournalEntryColor}-600/60`
