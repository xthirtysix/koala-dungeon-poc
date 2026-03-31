import { Dice } from '@/shared/tools/dice'
import { CriticalRoll } from '@/shared/consts/critical-roll.consts'
import type { RollResult } from '../model/roll-result.type'

let state0 = 0,
    state1 = 0,
    state2 = 0,
    state3 = 0

function initRandom() {
    const buffer = new Uint32Array(4)
    crypto.getRandomValues(buffer)
    state0 = buffer[0]
    state1 = buffer[1]
    state2 = buffer[2]
    state3 = buffer[3]
}

function sfc32(): number {
    const result = (state0 + state1 + state3) >>> 0
    const t = state1 << 21
    state2 ^= state0
    state3 ^= state1
    state1 ^= state2
    state0 ^= state3
    state2 ^= t
    state3 = (state3 << 17) | (state3 >>> 15)
    return result
}

function randomizeNumber(dice: Dice): number {
    return (sfc32() % dice) + 1
}

initRandom()

export function rollDice(dice: Dice, bonus: number = 0): RollResult {
    const result = randomizeNumber(dice)
    const isNatural =
        dice === Dice.D20 &&
        (result === CriticalRoll.FAILURE || result === CriticalRoll.SUCCESS)

    return {
        result: isNatural ? result : result + bonus,
        pool: { [dice]: result },
        isNatural,
    }
}

export function rollDiceWithAdvantage(
    dice: Dice,
    bonus: number = 0,
): RollResult {
    const resultsPool = {
        [dice]: [rollDice(dice, bonus), rollDice(dice, bonus)],
    }
    const pool = { [dice]: resultsPool[dice].map((roll) => roll.result) }

    const hasNaturalTwenty =
        dice === Dice.D20 &&
        resultsPool[dice].some(
            (roll) => roll.isNatural && roll.result === CriticalRoll.SUCCESS,
        )
    const result = hasNaturalTwenty
        ? CriticalRoll.SUCCESS
        : Math.max(...pool[dice])

    return {
        result,
        pool,
        isAdvantage: true,
        isNatural: hasNaturalTwenty,
    }
}

export function rollDiceWithDisadvantage(
    dice: Dice,
    bonus: number = 0,
): RollResult {
    const resultsPool = {
        [dice]: [rollDice(dice, bonus), rollDice(dice, bonus)],
    }
    const pool = { [dice]: resultsPool[dice].map((roll) => roll.result) }

    const hasNaturalOne =
        dice === Dice.D20 &&
        resultsPool[dice].some(
            (roll) => roll.isNatural && roll.result === CriticalRoll.FAILURE,
        )
    const result = hasNaturalOne
        ? CriticalRoll.FAILURE
        : Math.min(...pool[dice])

    return {
        result,
        pool,
        isDisadvantage: true,
        isNatural: hasNaturalOne,
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
