import { Dice, DiceIcon } from '@/entities/dice'

const diceIconByDice = new Map<Dice, DiceIcon>([
    [Dice.D4, DiceIcon.D4],
    [Dice.D6, DiceIcon.D6],
    [Dice.D8, DiceIcon.D8],
    [Dice.D10, DiceIcon.D10],
    [Dice.D12, DiceIcon.D12],
    [Dice.D20, DiceIcon.D20],
])

export function getDiceIcon(dice: Dice): DiceIcon {
    return diceIconByDice.get(dice) ?? DiceIcon.D20
}
