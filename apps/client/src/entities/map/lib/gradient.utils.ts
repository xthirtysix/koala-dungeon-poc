import type { CellEvent } from '@/entities/cell'

export const eventColors = {
    descend: 'var(--color-green-300)',
    ascend: 'var(--color-blue-300)',
    checkpoint: 'var(--color-rose-200)',
    store: 'var(--color-purple-200)',
    boss: 'var(--color-red-400)',
    companion: 'var(--color-yellow-400)',
}

export const eventTailwindColors = {
    descend: 'bg-green-300',
    ascend: 'bg-blue-300',
    checkpoint: 'bg-rose-200',
    store: 'bg-purple-200',
    boss: 'bg-red-400',
    companion: 'bg-yellow-400',
}

export const zoneTypes = [
    { key: 'boss', color: eventColors['boss'] },
    { key: 'companion', color: eventColors['companion'] },
]
export const otherTypes = [
    { key: 'descend', color: eventColors.descend },
    { key: 'ascend', color: eventColors.ascend },
    { key: 'checkpoint', color: eventColors.checkpoint },
    { key: 'store', color: eventColors.store },
]

export function getCellGradientId(events: CellEvent[]) {
    if (events.length < 2) return undefined

    const otherKey = events.find((e) => e.type !== 'zone')?.type
    const zoneKey = events.find((e) => e.type === 'zone')?.zoneType

    if (!zoneKey || !otherKey) return undefined

    return `gradient-${otherKey}-${zoneKey}`
}
