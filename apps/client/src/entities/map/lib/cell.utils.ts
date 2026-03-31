import { CellEvent } from '../model/cell.types'
import { eventColors, eventTailwindColors } from './gradient.utils'
import moveUp from '@/app/assets/images/map/move_up.webp'
import moveDown from '@/app/assets/images/map/move_down.webp'
import checkpoint from '@/app/assets/images/map/checkpoint.webp'
import store from '@/app/assets/images/map/store.webp'
import { StatKey } from '@/shared/model/stats/stats.types'

export const LABEL_BY_CHARACTERISTIC = new Map<string, string>([
    ['strength', 'сила'],
    ['dexterity', 'ловкость'],
    ['constitution', 'телосложение'],
    ['wisdom', 'мудрость'],
])

export const LABEL_BY_CHARACTERISTIC_SHORTHAND = new Map<string, string>([
    ['strength', 'сил'],
    ['dexterity', 'лвк'],
    ['constitution', 'тел'],
    ['wisdom', 'муд'],
])

export const LOCALIZED_EVENT_BY_TYPE = new Map<string, string>([
    ['descend', 'спуск'],
    ['ascend', 'подъем'],
    ['checkpoint', 'чекпоинт'],
    ['store', 'лавка'],
])

export function getEventLabelByEvent(events?: CellEvent[]): string {
    if (!events || events.length === 0) return ''

    const event = events?.find((e) => e.type !== 'zone')

    if (!event?.type) return ''

    return LOCALIZED_EVENT_BY_TYPE.get(event.type) || ''
}

export function getCellColorByEvent(events?: CellEvent[]): string {
    const event = events?.find((e) => e.type !== 'zone')
    const zoneEvent = events?.find((e) => e.type === 'zone')

    if (!event && zoneEvent) return eventColors[zoneEvent.zoneType]

    switch (event?.type) {
        case 'descend':
        case 'ascend':
        case 'checkpoint':
        case 'store':
            return eventColors[event.type]
        default:
            return 'var(--color-white)'
    }
}

export function getCellTailwindColorByEvent(events?: CellEvent[]): string {
    const event = events?.find((e) => e.type !== 'zone')

    switch (event?.type) {
        case 'descend':
        case 'ascend':
        case 'checkpoint':
        case 'store':
            return eventTailwindColors[event.type]
        default:
            return 'bg-white'
    }
}

export function getCellEmojiByEvent(events?: CellEvent[]): string {
    if (!events || events.length === 0) return ''

    const event = events.find((e) => e.type !== 'zone')

    if (!event) return ''

    switch (event.type) {
        case 'ascend':
            return moveUp
        case 'descend':
            return moveDown
        case 'checkpoint':
            return checkpoint
        case 'store':
            return store
        default:
            return ''
    }
}

export function getCellThrowByEvent(events?: CellEvent[]):
    | {
          statKey: StatKey | undefined
          destination: number
          check: number
      }
    | undefined {
    if (!events || events.length === 0) return

    const event = events.find(
        (e) => e.type === 'ascend' || e.type === 'descend',
    )

    if (!event) return

    if (event.type !== 'ascend' && event.type !== 'descend') return

    return {
        statKey: event.characteristic,
        check: event.check,
        destination: event.destinationCell,
    }
}
