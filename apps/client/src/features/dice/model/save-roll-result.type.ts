import { RollResult } from '@/features/dice'

export interface SaveRollData {
    roll_data: RollResult
    date: number
}

export interface SaveRollRequest {
    data: SaveRollData
}
