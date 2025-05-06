import type { Achievement } from '@/entities/achievement'

export interface Spirit {
    id: number
    nickname: string
    obstacleSpins?: number
    helpSpins?: number
    scheduledSpins?: number
    amount?: number
    reroll?: number
    achievements?: Achievement[]
    isHidden: boolean
}
