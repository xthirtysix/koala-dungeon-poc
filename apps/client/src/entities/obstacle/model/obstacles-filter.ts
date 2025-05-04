import { ref, computed, toRef } from 'vue'
import type { Obstacle } from '@/entities/obstacle'

interface TypeOption {
    label: string
    value: string
    chip: {
        color: string
    }
}

export function useObstacles({ data }: { data: MaybeRef<Obstacle[]> }) {
    const typeOptions = ref<TypeOption[]>([
        { label: 'Одноразовые', value: 'once', chip: { color: 'error' } },
        {
            label: 'Многоразовые',
            value: 'reusable',
            chip: { color: 'success' },
        },
        { label: 'Событие', value: 'event', chip: { color: 'warning' } },
        { label: 'Стримовые', value: 'stream', chip: { color: 'info' } },
    ])

    const obstacles = toRef(data)
    const selectedType = ref<TypeOption[]>([])
    const onlyUnlocked = ref(false)

    const filteredObstacles = computed(() => {
        let filtered = [...obstacles.value]

        if (selectedType.value.length > 0) {
            filtered = filtered.filter((obstacle) =>
                selectedType.value.some((type) => type.value === obstacle.type),
            )
        }

        if (onlyUnlocked.value) {
            filtered = filtered.filter((obstacle) => !!obstacle.description)
        }

        return filtered.sort((a, b) => a.name.localeCompare(b.name))
    })

    return {
        selectedType,
        onlyUnlocked,
        filteredObstacles,
        typeOptions,
    }
}
