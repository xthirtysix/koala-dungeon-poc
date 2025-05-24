import { Dice, DiceIcon } from '@/entities/dice'
import type { FastDiceAction } from '@/widgets/fast-dice'

export const actions: FastDiceAction[] = [
    {
        icon: DiceIcon.D4,
        label: 'd4',
        dice: Dice.D4,
    },
    {
        icon: DiceIcon.D6,
        label: 'd6',
        dice: Dice.D6,
    },
    {
        icon: DiceIcon.D8,
        label: 'd8',
        dice: Dice.D8,
    },
    {
        icon: DiceIcon.D10,
        label: 'd10',
        dice: Dice.D10,
    },
    {
        icon: DiceIcon.D12,
        label: 'd12',
        dice: Dice.D12,
    },
    {
        icon: DiceIcon.D20,
        label: 'd20',
        dice: Dice.D20,
    },
]
