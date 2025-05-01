export enum ArtefactSlot {
  Belt = 'belt',
  Chest = 'chest',
  Feet = 'feet',
  Hands = 'hands',
  Head = 'head',
  Weapon = 'weapon'
}

export interface ArtefactStats {
  strength?: number
  dexterity?: number
  constitution?: number
  wisdom?: number
}

export interface Artefact {
  id: string
  name: string
  slot: ArtefactSlot
  description: string
  stats: ArtefactStats
  durability: number
}
