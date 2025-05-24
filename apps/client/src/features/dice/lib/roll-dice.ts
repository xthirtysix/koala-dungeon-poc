import { Dice } from '@/entities/dice'
import { RollResult } from '@/features/dice'

function randomizeNumber(dice: Dice): number {
    return Math.floor(Math.random() * dice) + 1
}

export function rollDice(dice: Dice): RollResult {
    const result = randomizeNumber(dice)

    return {
        result,
        pool: { [dice]: result },
    }
}

export function rollDiceWithAdvantage(dice: Dice): RollResult {
    const pool = { [dice]: [randomizeNumber(dice), randomizeNumber(dice)] }
    const result = Math.max(...pool[dice])

    return {
        result,
        pool,
        isAdvantage: true,
    }
}

export function rollDiceWithDisadvantage(dice: Dice): RollResult {
    const pool = { [dice]: [randomizeNumber(dice), randomizeNumber(dice)] }
    const result = Math.min(...pool[dice])

    return {
        result,
        pool,
        isDisadvantage: true,
    }
}

export function rollDicePool(dices: Partial<Record<Dice, number>>): RollResult {
    const pool: Partial<Record<Dice, number[]>> = {}
    let result = 0

    for (const dice in dices) {
        const diceKey = Number(dice) as Dice
        const count = dices[diceKey]

        for (let i = 0; i < (count ?? 0); i++) {
            if (!pool[diceKey]) pool[diceKey] = []

            const value = randomizeNumber(diceKey)
            pool[diceKey].push(value)
            result += value
        }
    }

    return {
        result,
        pool,
    }
}
