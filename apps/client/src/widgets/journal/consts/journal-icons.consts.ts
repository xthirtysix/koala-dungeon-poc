import type { JournalEntry } from '@/entities/journal'

type EventIcon = '🎲' | '🎮' | '🎡' | '🎁' | '🏪' | '👾' | '⚙️'

export const FALLBACK_EVENT_ICON = '📝'

export const ICON_BY_EVENT_TYPE = new Map<JournalEntry['type'], EventIcon>([
    ['dice', '🎲'],
    ['game', '🎮'],
    ['wheel', '🎡'],
    ['gift', '🎁'],
    ['shop', '🏪'],
    ['boss', '👾'],
    ['system', '⚙️'],
])
