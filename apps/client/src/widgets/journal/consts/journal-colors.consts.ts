import { JournalEntry } from '@/entities/journal'
import { JournalBadgeBackground } from '../model/journal-entry.types'

export const BG_BY_TYPE = new Map<JournalEntry['type'], JournalBadgeBackground>(
    [
        ['game', 'bg-orange-200/40 dark:bg-orange-600/60'],
        ['dice', 'bg-green-200/40 dark:bg-green-600/60'],
        ['wheel', 'bg-violet-200/40 dark:bg-violet-600/60'],
        ['gift', 'bg-blue-200/40 dark:bg-blue-600/60'],
        ['shop', 'bg-yellow-200/40 dark:bg-yellow-600/60'],
        ['boss', 'bg-red-200/40 dark:bg-red-600/60'],
        ['system', 'bg-gray-200/40 dark:bg-gray-600/60'],
    ],
)
