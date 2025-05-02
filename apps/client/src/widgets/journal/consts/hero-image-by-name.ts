import { bgHeroesData } from '@/entities/journal'
import { ref } from 'vue'

export const heroImageByName = ref<Map<string, string>>(
    new Map(bgHeroesData.map(({ name, image }) => [name, image])),
)
