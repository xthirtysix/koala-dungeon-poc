import { type RollResult } from '@/features/dice'

export interface RollEntry {
    id: string
    rollResult: RollResult
    timestamp: number
    saved: boolean
}

export interface RollsState {
    rolls: RollEntry[]
    isLoading: boolean
    error: string | null
}
