<script setup lang="ts">
import { computed } from 'vue'
import { PropertyBadge } from '@/widgets/property-badge'
import {
    useArtefactProperties,
    type FilteredArtefactProperties,
    type Artefact,
} from '@/entities/artefact'
import { type CharacterSlot } from '@/entities/character'

const props = defineProps<{
    artefact?: Partial<Artefact> | null
    slot?: CharacterSlot
    usages?: number
}>()

const { propertiesLong, getPropertyClass } = useArtefactProperties(
    props.artefact as Artefact | null,
)

const filteredPropertiesLong = computed<FilteredArtefactProperties>(() => {
    if (!propertiesLong.value) return

    const { price, ...filteredProperties } = propertiesLong.value

    return filteredProperties
})

const durabilityLabel = computed<string | undefined>(() => {
    if (!props.artefact || !props.slot) return undefined

    return props.artefact?.properties?.durability
        ? `Прочность ${Math.max(props.artefact.properties.durability - (props.usages ?? 0), 0)} из ${props.artefact.properties.durability}`
        : 'Не ломается'
})

const labelBySlot = computed<string>(() => {
    if (!props.slot) return ''

    switch (props.slot) {
        case 'head':
            return 'Голова'
        case 'chest':
            return 'Нагрудник'
        case 'hands':
            return 'Руки'
        case 'feet':
            return 'Ноги'
        case 'weapon':
            return 'Оружие'
        default:
            return 'Пояс'
    }
})
</script>

<template>
    <u-popover
        mode="click"
        :ui="{
            content: 'rounded-3xl',
        }"
    >
        <figure
            class="relative flex min-h-20 w-auto items-center justify-center rounded-3xl bg-gray-100 py-1 text-gray-400 capitalize ring-1 ring-gray-300 dark:bg-gray-700 dark:ring-gray-500"
            :class="{
                'cursor-help': !!artefact,
                'border-dashed': !artefact,
            }"
        >
            <img
                v-if="artefact"
                class="h-auto max-h-18 w-auto"
                :src="artefact?.image?.url"
                :alt="artefact?.name"
            />
            <span v-else class="font-amatic mx-2 truncate text-2xl font-bold">
                {{ labelBySlot }}
            </span>
        </figure>

        <template #content>
            <article
                v-if="artefact"
                class="bg-base flex max-w-70 flex-col justify-center p-4 text-base"
            >
                <h4 class="font-amatic mb-3 text-3xl font-bold">
                    {{ artefact?.name }}
                </h4>
                <div
                    class="flex flex-col items-start justify-start gap-1 font-bold"
                >
                    <ul v-if="filteredPropertiesLong">
                        <li
                            v-for="(value, key) in filteredPropertiesLong"
                            :key="key"
                            class="z-20 flex gap-2 text-sm"
                        >
                            <property-badge
                                :property="key"
                                :class="getPropertyClass(value ?? '')"
                            >
                                {{
                                    key === 'durability'
                                        ? durabilityLabel
                                        : value
                                }}
                            </property-badge>
                        </li>
                    </ul>

                    <p class="mt-3 text-justify text-base font-medium">
                        {{ artefact.description }}
                    </p>
                </div>
            </article>
        </template>
    </u-popover>
</template>
