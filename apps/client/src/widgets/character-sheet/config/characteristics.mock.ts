import strengthIcon from '@/app/assets/images/characteristics/0_strength.png'
import constitutionIcon from '@/app/assets/images/characteristics/1_constitution.png'
import dexterityIcon from '@/app/assets/images/characteristics/2_dexterity.png'
import wisdomIcon from '@/app/assets/images/characteristics/3_wisdom.png'
import { type CharacterAttribute } from '@/entities/character'

export const attributesMock: CharacterAttribute[] = [
    {
        key: 'strength',
        label: 'Сила',
        short: 'сил',
        value: 10,
        icon: strengthIcon,
    },
    {
        key: 'constitution',
        label: 'Телосложение',
        short: 'тел',
        value: 10,
        icon: constitutionIcon,
    },
    {
        key: 'dexterity',
        label: 'Ловкость',
        short: 'лов',
        value: 10,
        icon: dexterityIcon,
    },
    {
        key: 'wisdom',
        label: 'Мудрость',
        short: 'муд',
        value: 10,
        icon: wisdomIcon,
    },
]
