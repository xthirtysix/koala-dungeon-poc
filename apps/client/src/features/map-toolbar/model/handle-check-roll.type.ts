import { RollConfirmAction } from '@/widgets/roll-confirm'
import { Dice } from '@/shared/tools/dice'
import { ToolbarCellThrow } from './toolbar-cell.type'

interface CheckRollData {
    action: RollConfirmAction
    dice?: Dice
}

export interface HandleCheckRollParams {
    rollData: CheckRollData
    checkData: ToolbarCellThrow
    bonus?: number
}
