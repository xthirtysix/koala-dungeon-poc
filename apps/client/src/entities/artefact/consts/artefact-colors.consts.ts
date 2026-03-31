import { ArtefactSlot } from '../model/artefact.types'
import type {
    ArtefactBackground,
    ArtefactBorder,
    ArtefactRing,
} from '../model/artefact-colors.types'

export const BG_BY_TYPE = new Map<ArtefactSlot, ArtefactBackground>([
    [ArtefactSlot.Weapon, `dark:bg-red-600/80 bg-red-300/90`],
    [ArtefactSlot.Head, `dark:bg-green-600/80 bg-green-300/90`],
    [ArtefactSlot.Chest, `dark:bg-blue-600/80 bg-blue-300/90`],
    [ArtefactSlot.Hands, `dark:bg-violet-600/80 bg-violet-300/90`],
    [ArtefactSlot.Feet, `dark:bg-yellow-600/80 bg-yellow-300/90`],
    [ArtefactSlot.Belt, `dark:bg-gray-600/80 bg-gray-300/90`],
])

export const BORDER_BY_TYPE = new Map<ArtefactSlot, ArtefactBorder>([
    [ArtefactSlot.Weapon, `dark:border-red-600/80 border-red-300`],
    [ArtefactSlot.Head, `dark:border-green-600/80 border-green-300`],
    [ArtefactSlot.Chest, `dark:border-blue-600/80 border-blue-300`],
    [ArtefactSlot.Hands, `dark:border-violet-600/80 border-violet-300`],
    [ArtefactSlot.Feet, `dark:border-yellow-600/80 border-yellow-300`],
    [ArtefactSlot.Belt, `dark:border-gray-600/80 border-gray-300`],
])

export const RING_BY_TYPE = new Map<ArtefactSlot, ArtefactRing>([
    [ArtefactSlot.Weapon, `dark:ring-red-600/80 ring-red-300`],
    [ArtefactSlot.Head, `dark:ring-green-600/80 ring-green-300`],
    [ArtefactSlot.Chest, `dark:ring-blue-600/80 ring-blue-300`],
    [ArtefactSlot.Hands, `dark:ring-violet-600/80 ring-violet-300`],
    [ArtefactSlot.Feet, `dark:ring-yellow-600/80 ring-yellow-300`],
    [ArtefactSlot.Belt, `dark:ring-gray-600/80 ring-gray-300`],
])
