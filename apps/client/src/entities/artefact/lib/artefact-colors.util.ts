import { ArtefactSlot } from '@/entities/artefact'
import { TailwindLiteralColor } from '@/shared/lib/color.utils'

export const colorByArtefactSlot = new Map<ArtefactSlot, TailwindLiteralColor>([
    [ArtefactSlot.Weapon, 'red'],
    [ArtefactSlot.Head, 'green'],
    [ArtefactSlot.Chest, 'blue'],
    [ArtefactSlot.Hands, 'purple'],
    [ArtefactSlot.Feet, 'orange'],
    [ArtefactSlot.Belt, 'stone'],
])
