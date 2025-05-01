import type { Achievement } from '@/entities/achievement'

export interface Hero {
    name: string
    interferenceWheelSpins: number
    helpWheelSpins: number
    deferredInterferences: number
    totalDonations: number
    achievements: Achievement[]
    rerolls: number
}
