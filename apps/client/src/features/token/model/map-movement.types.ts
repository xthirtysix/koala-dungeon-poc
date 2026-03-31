import { Cell } from '@/entities/cell'

export type MoveTokenOptions = {
    teleport: boolean
}

export type UseMapMovementParams = {
    path: Cell[]
}
