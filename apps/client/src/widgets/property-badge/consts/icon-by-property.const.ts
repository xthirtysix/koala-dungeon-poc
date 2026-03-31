import { ArtefactKey } from '@/entities/artefact'
import strengthIcon from '@/app/assets/images/characteristics/0_strength.webp'
import constitutionIcon from '@/app/assets/images/characteristics/1_constitution.webp'
import dexterityIcon from '@/app/assets/images/characteristics/2_dexterity.webp'
import wisdomIcon from '@/app/assets/images/characteristics/3_wisdom.webp'
import durabilityIcon from '@/app/assets/images/characteristics/curse_icon.webp'
import moneyIcon from '@/app/assets/images/characteristics/money.webp'

export const ICON_BY_PROPERTY = new Map<ArtefactKey, string>([
    ['strength', strengthIcon],
    ['dexterity', dexterityIcon],
    ['constitution', constitutionIcon],
    ['wisdom', wisdomIcon],
    ['durability', durabilityIcon],
    ['price', moneyIcon],
])
