import { Dice, DiceIcon } from '@/entities/dice'
import { type RollResult } from '@/features/dice'

const TOAST_DURATION = 10_000

const toast = useToast()

export function displayRollToast(roll: RollResult) {
    const biggestDice: number = Math.max(...Object.keys(roll.pool).map(Number))
    let title: string = 'Результат'
    let description: string = ''

    if (roll.isAdvantage) {
        title = 'Преимущество'
    }
    if (roll.isDisadvantage) {
        title = 'Помеха'
    }

    if (roll.isAdvantage || roll.isDisadvantage) {
        const [first, second] = Object.values(roll.pool).flat()
        const dice = Dice[biggestDice]
        description = `На ${dice.toLowerCase()} выпало ${first} и ${second}`
    }

    if (
        Object.keys(roll.pool).length > 1 ||
        Object.values(roll.pool).flat().length > 1
    ) {
        description = Object.entries(roll.pool)
            .map(([dice, results]) => `d${dice}: ${results.join(', ')}`)
            .join('\n')
    }

    toast.add({
        title: `${title}: ${roll.result}`,
        description,
        color: 'primary',
        icon: DiceIcon[`D${biggestDice}` as keyof typeof DiceIcon],
        duration: TOAST_DURATION,
        ui: {
            title: 'text-lg',
            description: 'whitespace-pre-wrap',
            icon: 'w-12 h-12 self-center',
        },
    })
}
