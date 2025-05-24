import { Dice } from '@/entities/dice'

export type RollResult = {
    readonly result: number
    readonly pool: Partial<Record<Dice, number[]>>
    readonly isAdvantage?: boolean
    readonly isDisadvantage?: boolean
}
