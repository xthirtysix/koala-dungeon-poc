export type ObstacleType =
    | 'одноразовая'
    | 'многоразовая'
    | 'событие'
    | 'один раз за стрим'

export interface Obstacle {
    id: string
    name: string
    description: string | null
    type: ObstacleType
    isUnlocked: boolean
    isActive: boolean
    updatedAt: string
}
