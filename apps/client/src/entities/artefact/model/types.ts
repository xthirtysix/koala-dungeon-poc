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
    characteristic: 'сила' | 'ловкость' | 'телосложение' | 'мудрость'
    value: number
    isNegative: boolean
}

export interface Artefact {
    id: string
    name: string
    slot: ArtefactSlot
    description: string
    durability: number
    price?: number
    bonus: ArtefactBonus[]
    image: {
        url: string
        alt: string
    }
}
