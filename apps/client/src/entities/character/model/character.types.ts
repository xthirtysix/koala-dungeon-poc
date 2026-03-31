import { type Artefact } from '@/entities/artefact'
import type {
    ProgressbarBackground,
    ProgressbarForeground,
} from '@/shared/model/colors.types'
import { type StatKey } from '@/shared/model/stats/stats.types'

export interface Character {
    id: number
    documentId: string
    name: string
    maxHealth: number
    health: number
    experience: number
    attributeStrength: number
    attributeConstitution: number
    attributeDexterity: number
    attributeWisdom: number
    coins: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    isActive: boolean
    map_placement: number
    is_movement_locked: boolean
    equipment_usages: EquipmentUsages
    head: Artefact | null
    chest: Artefact | null
    hands: Artefact | null
    feet: Artefact | null
    weapon: Artefact | null
    belt1: Artefact | null
    belt2: Artefact | null
    belt3: Artefact | null
}

export interface EquipmentUsages {
    feet: number
    head: number
    belt1: number
    belt2: number
    belt3: number
    chest: number
    hands: number
    weapon: number
}

export interface CharacterResource {
    label: string
    value: number
    max: number
    icon: string
    color: ProgressbarForeground
    backgroundColor: ProgressbarBackground
}

export interface CharacterAttribute {
    key: StatKey | 'price'
    label: string
    short: string
    value: number
    icon: string
}

export enum CharacterSlot {
    Head = 'head',
    Chest = 'chest',
    Hands = 'hands',
    Feet = 'feet',
    Weapon = 'weapon',
    Belt1 = 'belt1',
    Belt2 = 'belt2',
    Belt3 = 'belt3',
}

export type StatBonuses = {
    artefacts: Artefact[]
    totalBonus: number
}

export type StatToBonusesMap = Partial<Record<StatKey, StatBonuses>>
