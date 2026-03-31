import { JournalEntry } from '@/entities/journal'
import { JournalBadgeBackground } from '../model/journal-entry.types'

export const BG_BY_TYPE = new Map<JournalEntry['type'], JournalBadgeBackground>(
    [
        ['game', 'bg-violet-100/40 dark:bg-violet-300/40'],
        ['dice', 'bg-blue-100/40 dark:bg-blue-300/40'],
        ['wheel', 'bg-lime-100/40 dark:bg-lime-300/40'],
        ['gift', 'bg-green-100/40 dark:bg-green-300/40'],
        ['shop', 'bg-orange-100/40 dark:bg-orange-300/40'],
        ['boss', 'bg-red-100/40 dark:bg-red-300/40'],
        ['system', 'bg-gray-100/40 dark:bg-gray-300/40'],
    ],
)
