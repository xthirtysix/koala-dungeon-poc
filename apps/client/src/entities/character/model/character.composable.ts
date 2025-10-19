import { computed } from 'vue'
import { useQuery } from '@pinia/colada'
import {
    type Character,
    type CharacterResource,
    type CharacterAttribute,
    characterApi,
    XP_PER_LEVEL,
} from '@/entities/character'
import healthIcon from '@/app/assets/images/characteristics/health.png'
import levelIcon from '@/app/assets/images/characteristics/level.png'
import strengthIcon from '@/app/assets/images/characteristics/0_strength.png'
import constitutionIcon from '@/app/assets/images/characteristics/1_constitution.png'
import dexterityIcon from '@/app/assets/images/characteristics/2_dexterity.png'
import wisdomIcon from '@/app/assets/images/characteristics/3_wisdom.png'
import { Artefact, ArtefactSlot } from '@/entities/artefact'

export function useCharacter() {
    const {
        data: characterData,
        error,
        isPending,
    } = useQuery({
        key: ['main-character'],
        query: () => characterApi.fetchMain(),
    })

    const character = computed<Character | null>(
        () => characterData.value?.data || null,
    )
    const meta = computed(() => characterData.value?.meta || null)

    const errorMessage = computed(() => error.value?.message || null)

    const resources = computed<CharacterResource[]>(() => [
        {
            label: 'Здоровье',
            value: character.value?.health || 0,
            max: character.value?.maxHealth || 0,
            icon: healthIcon,
            color: 'red',
        },
        {
            label: 'Опыт',
            value: character.value?.experience ?? 0,
            max: XP_PER_LEVEL,
            icon: levelIcon,
            color: 'violet',
        },
    ])

    const attributes = computed<CharacterAttribute[]>(() => [
        {
            key: 'strength',
            label: 'Сила',
            short: 'сил',
            value: character.value?.attributeStrength || 0,
            icon: strengthIcon,
        },
        {
            key: 'constitution',
            label: 'Телосложение',
            short: 'тел',
            value: character.value?.attributeConstitution || 0,
            icon: constitutionIcon,
        },
        {
            key: 'dexterity',
            label: 'Ловкость',
            short: 'лов',
            value: character.value?.attributeDexterity || 0,
            icon: dexterityIcon,
        },
        {
            key: 'wisdom',
            label: 'Мудрость',
            short: 'муд',
            value: character.value?.attributeWisdom || 0,
            icon: wisdomIcon,
        },
    ])

    const equipment = computed<[ArtefactSlot, Artefact | null][]>(() => {
        if (!character.value) return []

        return [
            [ArtefactSlot.Head, character.value.head || null],
            [ArtefactSlot.Chest, character.value.chest || null],
            [ArtefactSlot.Hands, character.value.hands || null],
            [ArtefactSlot.Feet, character.value.feet || null],
            [ArtefactSlot.Weapon, character.value.weapon || null],
            [ArtefactSlot.Belt, character.value.belt1 || null],
            [ArtefactSlot.Belt, character.value.belt2 || null],
            [ArtefactSlot.Belt, character.value.belt3 || null],
        ]
    })

    return {
        data: character,
        attributes,
        meta,
        isLoading: isPending,
        error: errorMessage,
        resources,
        equipment,
    }
}
