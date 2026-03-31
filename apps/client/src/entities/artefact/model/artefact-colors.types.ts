import { TailwindColor } from '@/shared/model/colors.types'

export type ArtefactColor = Extract<
    TailwindColor,
    'red' | 'green' | 'blue' | 'violet' | 'yellow' | 'gray'
>

export type ArtefactBackground =
    `dark:bg-${ArtefactColor}-600/80 bg-${ArtefactColor}-300/90`
export type ArtefactBorder =
    `dark:border-${ArtefactColor}-600/80 border-${ArtefactColor}-300`
export type ArtefactRing =
    `dark:ring-${ArtefactColor}-600/80 ring-${ArtefactColor}-300`
