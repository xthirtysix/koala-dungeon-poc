export interface Artefact{
    id: string
    name: string
    type: 'belt' | 'legs' | 'chest' | 'head' | 'weapon' | 'hands'
    description: string
    attributes: string
    durability: number | undefined
}
