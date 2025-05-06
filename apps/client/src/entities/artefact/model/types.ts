export enum ArtefactSlot {
    Belt = 'пояс',
    Chest = 'нагрудник',
    Feet = 'ноги',
    Hands = 'руки',
    Head = 'голова',
    Weapon = 'оружие',
}

export interface ArtefactBonus {
    id: number
    characteristic: 'cила' | 'ловкость' | 'телосложение' | 'мудрость'
    value: number
    isNegative: boolean
}

export interface Artefact {
    id: string
    name: string
    slot: ArtefactSlot
    description: string
    durability: number
    bonus: ArtefactBonus[]
}
