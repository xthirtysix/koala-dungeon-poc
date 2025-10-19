import { CellEvent, eventColors } from '@/entities/cell'

export function getCellColorByEvent(events?: CellEvent[]): string {
    const event = events?.[events.length - 1]

    if (!event) return 'var(--color-stone-300)'

    switch (event.type) {
        case 'descend':
        case 'ascend':
        case 'checkpoint':
        case 'store':
            return eventColors[event.type]
        case 'zone':
            return eventColors[event.zoneType]
        default:
            return 'var(--color-stone-300)'
    }
}

export function getCellEmojiByEvent(events?: CellEvent[]): string {
    if (!events || events.length === 0) return ''

    const event = events.find((e) => e.type !== 'zone')

    if (!event) return ''

    switch (event.type) {
        case 'ascend':
            return '🔼'
        case 'descend':
            return '🔽'
        case 'checkpoint':
            return '⛳️'
        case 'store':
            return '🛒'
        default:
            return ''
    }
}
