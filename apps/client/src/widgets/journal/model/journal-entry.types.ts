import { ColorClass, TailwindColor } from '@/shared/model/colors.types'

export type JournalEntryColor = Extract<
    TailwindColor,
    'violet' | 'blue' | 'lime' | 'green' | 'orange' | 'red' | 'gray'
>

export type JournalBadgeBackground =
    `bg-${JournalEntryColor}-100/40 dark:bg-${JournalEntryColor}-300/40`
