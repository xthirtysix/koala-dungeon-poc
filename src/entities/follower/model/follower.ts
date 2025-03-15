import type { Trophy } from "@/entities/trophy"

export interface Follower {
    id: string | number
    name: string
    helpSpins?: number
    interferenceSpins?: number
    interferencesScheduled?: number
    contribution?: number
    trophies?: Trophy[]
}
