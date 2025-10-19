import { Artefact } from "@/entities/artefact"

export interface Character {
  id: string
  map_placement: number | null
  name: string
  coins: number
  health: number
  maxHealth: number
  experience: number
  attributeStrength: number
  attributeConstitution: number
  attributeDexterity: number
  attributeWisdom: number
  head: Artefact | null
  chest: Artefact | null
  hands: Artefact | null
  feet: Artefact | null
  weapon: Artefact | null
  belt1: Artefact | null
  belt2: Artefact | null
  belt3: Artefact | null
}

export interface CharacterResource {
  label: string
  value: number
  max: number
  icon: string
  color: string
}

export interface CharacterAttribute {
  key: string
  label: string
  short: string
  value: number
  icon: string
}
