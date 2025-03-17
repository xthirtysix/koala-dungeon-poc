<script setup lang="ts">
import type { Artefact } from '../../model/artefact'
import { typeColors, typeLabels } from '../../model/artefact-utils'
import { AttributeBadge, Attribute } from '@/widgets/attribute'

defineProps<{ artefact: Artefact }>()

const isHovering = ref<boolean>(false)
const ui = ref({ body: 'grow' })

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

const onMouseEnter = () => {
    isHovering.value = true
}

const onMouseLeave = () => {
    isHovering.value = false
}
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

        <div class="inline-flex m-auto flex-col h-full relative gap-2">
            <figure
                class="relative flex justify-center min-h-[150px] before:z-[0] before:absolute before:left-[50%] before:top-[50%] before:w-[68%] before:-translate-[50%] before:pb-[68%] before:h-auto before:mr-4 before:bg-purple-100 before:rounded-full"
            >
                <NuxtImg
                    preset="artefact"
                    :src="`/artefacts/${artefact.id}.png`"
                    :alt="artefact.name"
                    class="relative hover-image"
                    :class="{ animate: isHovering }"
                    @mouseenter="onMouseEnter"
                    @mouseleave="onMouseLeave"
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

<style scoped>
.image-container {
  display: inline-block;
  overflow: hidden;
  padding: 5px;
}

.hover-image {
  display: block;
  max-width: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.hover-image.animate {
  animation: continuousSway 3s ease-in-out infinite;
  animation-timing-function: linear;
}

@keyframes continuousSway {
  0% {
    transform: rotate(0deg) scale(1);
  }
  33% {
    transform: rotate(2deg) scale(1.015);
  }
  66% {
    transform: rotate(-3deg) scale(1.02);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
</style>
