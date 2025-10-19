import { JournalEntry } from '@/entities/journal'
import { TailwindLiteralColor } from '@/shared/lib/color.utils'

export const colorByJournalEntryType = new Map<
    JournalEntry['type'],
    TailwindLiteralColor
>([
    ['game', 'purple'],
    ['dice', 'blue'],
    ['wheel', 'lime'],
    ['gift', 'green'],
    ['shop', 'orange'],
    ['boss', 'red'],
    ['system', 'gray'],
])
