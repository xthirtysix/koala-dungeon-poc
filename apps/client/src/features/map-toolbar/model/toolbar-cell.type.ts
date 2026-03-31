import type { Cell } from '@/entities/cell'
import { StatKey } from '@/shared/model/stats/stats.types'

export type ToolbarCellThrow = {
    statKey: StatKey
    check: number
    destination: number
}

export type ToolbarCell = Cell & {
    number: number
    title: string
    css: string
    icon?: string
    throw?: ToolbarCellThrow
    destination?: string
}
