import { computed, shallowRef } from 'vue'
import { Artefact, ArtefactProperty } from './artefact.types'
import { FilteredArtefactProperties } from './artefact-properties.types'

export function useArtefactProperties(artefact: Artefact | null) {
    const labelByProperty = shallowRef<Map<keyof ArtefactProperty, string>>(
        new Map([
            ['strength', 'сила'],
            ['constitution', 'телосложение'],
            ['dexterity', 'ловкость'],
            ['wisdom', 'мудрость'],
            ['price', 'цена'],
            ['durability', 'прочность'],
        ]),
    )

    const propertiesShort = computed<FilteredArtefactProperties>(() => {
        if (!artefact?.properties) return

        const properties: FilteredArtefactProperties = {}

        const keys: (keyof ArtefactProperty)[] = [
            'strength',
            'constitution',
            'dexterity',
            'wisdom',
            'price',
            'durability',
        ]

        for (const key of keys) {
            switch (key) {
                case 'strength':
                case 'constitution':
                case 'dexterity':
                case 'wisdom':
                    if (!artefact.properties[key]) {
                        continue
                    }
                    properties[key] =
                        `${artefact.properties[key] > 0 ? '+' : '-'} ${Math.abs(artefact.properties[key])}`
                    break
                case 'durability':
                    properties[key] = artefact.properties[key]
                        ? `${artefact.properties[key]}`
                        : '∞'
                    break
                default:
                    if (!artefact.properties[key]) {
                        continue
                    }
                    properties[key] = artefact.properties[key].toString()
                    break
            }
        }

        return properties
    })

    const propertiesLong = computed<FilteredArtefactProperties>(() => {
        if (!artefact?.properties) return

        const properties: FilteredArtefactProperties = {}

        const keys: (keyof ArtefactProperty)[] = [
            'strength',
            'constitution',
            'dexterity',
            'wisdom',
            'price',
            'durability',
        ]

        for (const key of keys) {
            switch (key) {
                case 'strength':
                case 'constitution':
                case 'dexterity':
                case 'wisdom':
                    if (!artefact.properties[key]) {
                        continue
                    }
                    properties[key] =
                        `${artefact.properties[key] > 0 ? '+' : '-'} ${Math.abs(artefact.properties[key])} ${labelByProperty.value.get(key)}`
                    break
                case 'durability':
                    properties[key] = !artefact.properties[key]
                        ? 'не ломается'
                        : `${labelByProperty.value.get(key)} ${artefact.properties[key]}`
                    break
                default:
                    if (!artefact.properties[key]) {
                        continue
                    }
                    properties[key] =
                        `${labelByProperty.value.get(key)} ${artefact.properties[key]}`
                    break
            }
        }

        return properties
    })

    const getPropertyClass = (value: string) => {
        if (value.startsWith('-')) return 'text-red-600'
        if (value.startsWith('+')) return 'text-emerald-600'

        return ''
    }

    return {
        propertiesShort,
        propertiesLong,
        getPropertyClass,
    }
}
