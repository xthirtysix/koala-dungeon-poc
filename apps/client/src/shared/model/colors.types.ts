import { TAILWIND_COLORS } from '../consts/colors.consts'

export type TailwindColor = (typeof TAILWIND_COLORS)[number]
type ColorPrefix = 'bg' | 'text' | 'border' | 'ring'
type ColorShade =
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '950'
type Opacity =
    | '0'
    | '5'
    | '10'
    | '20'
    | '25'
    | '30'
    | '40'
    | '50'
    | '60'
    | '70'
    | '75'
    | '80'
    | '90'
    | '95'
    | '100'

export type ColorClass =
    `${'' | 'dark:'}${ColorPrefix}-${TailwindColor}-${ColorShade}${'' | `/${Opacity}`}`

export type ProgressbarBackground = `[&::-webkit-progress-bar]:${ColorClass}`
export type ProgressbarForeground = `[&::-webkit-progress-value]:${ColorClass}`
