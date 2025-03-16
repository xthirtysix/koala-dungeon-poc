<script setup lang="ts">
import type { Artefact } from '../../model/artefact'
import { typeColors, typeLabels } from '../../model/artefact-utils'
import { AttributeBadge, Attribute } from '@/widgets/attribute'

defineProps<{ artefact: Artefact }>()

const getTypeColor = (type: string) => {
    return typeColors.get(type) || 'neutral'
}

const getTypeLabel = (type: string) => {
    return typeLabels.get(type) || type
}

const getAttributes = (attributes: string) => {
    if (attributes === '-') return []
    return attributes.split(';').map((attr) => attr.trim())
}

const ui = ref({ body: 'grow' })
</script>

<template>
    <UCard class="h-full flex flex-col" :ui="ui">
        <template #header>
            <div class="flex items-center justify-between gap-[0.5rem]">
                <h3 class="text-md font-bold truncate">
                    {{ artefact.name }}
                </h3>
            </div>
        </template>

        <div class="flex flex-col h-full relative">
            <figure class="bg-purple-100 rounded-[50%] mb-4">
                <img
                    :src="`/artefacts/${artefact.id}.png`"
                    :alt="artefact.name"
                    class="aspect-square object-contain"
                />
            </figure>
            <p class="text-sm text-gray-600">
                {{ artefact.description }}
            </p>
            <UBadge
                :color="getTypeColor(artefact.type)"
                variant="subtle"
                class="absolute top-[-.85rem] left-[-.5rem] capitalize"
            >
                {{ getTypeLabel(artefact.type) }}
            </UBadge>
            <section class="absolute top-[-1rem] right-[-2.5rem] grid gap-1">
                <AttributeBadge
                    :attribute="Attribute.DURABILITY"
                    :modifier="artefact.durability"
                />
                <AttributeBadge
                    v-for="attr in getAttributes(artefact.attributes)"
                    :key="attr"
                    :attribute="attr.split(' ')[0].toLowerCase()"
                    :modifier="parseInt(attr.split(' ')[2])"
                    :modifier-type="attr.split(' ')[1]"
                />
            </section>
        </div>
    </UCard>
</template>
