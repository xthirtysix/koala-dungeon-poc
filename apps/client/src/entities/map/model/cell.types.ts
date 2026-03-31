export interface Cell {
    x: number
    y: number
    events?: CellEvent[]
}

type Characteristic = 'strength' | 'dexterity' | 'constitution' | 'wisdom'

export type CellEvent =
    | { type: 'checkpoint' | 'sponsor' | 'store' | null }
    | {
          type: 'zone'
          zoneType: 'boss' | 'companion'
          endCell: number
          startCell: number
      }
    | {
          type: 'descend' | 'ascend'
          characteristic: Characteristic
          check: number
          destinationCell: number
      }
