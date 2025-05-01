import { bgHeroesData } from '@/entities/journal'

export const heroImageByName = ref<Map<string, string>>(
    new Map(bgHeroesData.map(({ name, image }) => [name, image])),
)
