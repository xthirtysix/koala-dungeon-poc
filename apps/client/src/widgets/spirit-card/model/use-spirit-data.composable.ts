import { computed } from 'vue'
import { BORDER_BY_PLACE, RING_BY_PLACE } from '@/entities/spirit'
import type { SpiritStats } from './spirit-stats.type'
import type { UseSpiritDataProps } from './use-spirit-data.type'

export function useSpiritData({ spirit, place = 0 }: UseSpiritDataProps) {
    if (!spirit) return {}

    const stats = computed<SpiritStats[]>(() => {
        return [
            { label: 'помехи', value: spirit.obstacleSpins ?? 0 },
            { label: 'помощь', value: spirit.helpSpins ?? 0 },
            { label: 'отложено', value: spirit.scheduledSpins ?? 0 },
            { label: 'донаты', value: spirit.amount ?? 0 },
            { label: 'реролы', value: spirit.reroll ?? 0 },
            {
                label: 'достижения',
                value: spirit.achievements?.length ?? 0,
            },
        ]
    })

    const borderColor = computed(() => {
        if (!place) return ''

        return BORDER_BY_PLACE.get(place)
    })

    const ringColor = computed(() => {
        if (!place) return ''

        return RING_BY_PLACE.get(place)
    })

    return {
        stats,
        borderColor,
        ringColor,
    }
}
