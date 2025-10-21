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
    id: number
    documentId: string
    name: string
    slot: string
    description: string
    durability: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    price: number | null
    image: ImageData
    bonus: ArtefactBonus[]
}

export interface ImageData {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: ImageFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: {
        public_id: string
        resource_type: string
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export interface ImageFormats {
    large: ImageFormat
    small: ImageFormat
    medium: ImageFormat
    thumbnail: ImageFormat
}

export interface ImageFormat {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: string | null
    size: number
    width: number
    height: number
    sizeInBytes: number
    provider_metadata: {
        public_id: string
        resource_type: string
    }
}
