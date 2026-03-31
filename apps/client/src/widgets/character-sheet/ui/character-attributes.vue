<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCharacter, type CharacterAttribute } from '@/entities/character'
import { PropertyBadge } from '@/widgets/property-badge'

const props = defineProps<{
    attributes: CharacterAttribute[]
}>()

const character = useCharacter()

const GRID_COLUMNS = new Map<number, string>([
    [1, 'grid-cols-1'],
    [2, 'grid-cols-2'],
    [3, 'grid-cols-3'],
    [4, 'grid-cols-4'],
    [5, 'grid-cols-5'],
    [6, 'grid-cols-6'],
    [7, 'grid-cols-7'],
    [8, 'grid-cols-8'],
    [9, 'grid-cols-9'],
    [10, 'grid-cols-10'],
    [11, 'grid-cols-11'],
    [12, 'grid-cols-12'],
])

const open = ref(false)

const gridColsClass = computed(() => {
    const length = props.attributes?.length ?? 0
    const size = Math.min(Math.max(length, 1), 12)

    return GRID_COLUMNS.get(size)
})

const price = computed(() => {
    return props.attributes?.find((attribute) => attribute.key === 'price')
})

const characteristics = computed(() => {
    return props.attributes?.filter((attribute) => attribute.key !== 'price')
})
</script>

<template>
    <section v-if="attributes">
        <h3 class="sr-only">Характеристики</h3>

        <ul v-if="attributes" :class="['grid', gridColsClass, 'gap-2']">
            <li v-for="attribute in characteristics" :key="attribute.key">
                <u-popover
                    mode="click"
                    arrow
                    :ui="{ content: 'rounded-2xl', arrow: 'w-4 h-2' }"
                >
                    <property-badge
                        :property="attribute.key"
                        class="flex cursor-help gap-2"
                        @focus="open = true"
                        @blur="open = false"
                    >
                        <div
                            class="text-bold font-amatic flex w-full justify-start gap-1 align-baseline text-2xl"
                        >
                            <span
                                class="sr-only uppercase @md/char:not-sr-only"
                            >
                                {{ attribute.short }}
                            </span>
                            <span
                                class="font-bold"
                                :class="
                                    attribute.key === 'price'
                                        ? 'text-yellow-500'
                                        : 'text-primary'
                                "
                            >
                                {{
                                    attribute.key !== 'price'
                                        ? attribute.value +
                                          (character.equipmentBonusesByStat
                                              .value[attribute.key]
                                              ?.totalBonus ?? 0)
                                        : attribute.value
                                }}
                            </span>
                        </div>
                    </property-badge>
                    <template #content>
                        <dl
                            v-if="attribute.key !== 'price'"
                            class="font-amatic text-muted grid grid-cols-[1fr_max-content] gap-x-4 gap-y-2 rounded-xl p-4 text-2xl font-bold"
                        >
                            <dt>{{ attribute.label }}</dt>
                            <dd class="text-right">{{ attribute.value }}</dd>

                            <template
                                v-for="artefact in character.equipmentBonusesByStat.value[
                                    attribute.key
                                ]?.artefacts.sort((a, b) => {
                                    return (
                                        b.properties[attribute.key] -
                                        a.properties[attribute.key]
                                    )
                                })"
                                :key="artefact.id"
                            >
                                <dt>{{ artefact.name }}</dt>
                                <dd class="text-right">
                                    {{ artefact.properties[attribute.key] }}
                                </dd>
                            </template>
                        </dl>
                    </template>
                </u-popover>
            </li>
            <li v-if="price">
                <property-badge
                    :property="price.key"
                    class="flex cursor-default gap-2"
                >
                    <div
                        class="text-bold font-amatic flex w-full justify-start gap-1 align-baseline text-2xl"
                    >
                        <span class="sr-only uppercase @md/char:not-sr-only">
                            {{ price.short }}
                        </span>
                        <span class="font-bold" :class="'text-yellow-500'">
                            {{ price.value }}
                        </span>
                    </div>
                </property-badge>
            </li>
        </ul>
    </section>
</template>
