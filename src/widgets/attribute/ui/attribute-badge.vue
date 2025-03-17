<script setup lang="ts">
import { Attribute } from '../model/attribute'

const iconByAttribute = new Map<Attribute, string>([
    [Attribute.STRENGTH, 'i-game-icons:biceps'],
    [Attribute.DEXTERITY, 'i-game-icons:body-balance'],
    [Attribute.WISDOM, 'i-game-icons:barn-owl'],
    [Attribute.CONSTITUTION, 'i-game-icons:shoulder-armor'],
    [Attribute.DURABILITY, 'i-game-icons:broken-shield'],
])

const props = defineProps<{
    attribute: Attribute
    modifier?: number
    modifierType?: '+' | '-'
}>()

const bgColor = computed<string>(() =>{
    switch (props.modifierType) {
        case '+':
            return 'bg-green-100 dark:bg-green-300'
        case '-':
            return 'bg-red-100 dark:bg-red-300'
        default:
            return 'bg-gray-100 dark:bg-gray-200'
    }
})

const fgColor = computed<string>(() => {
    switch (props.modifierType) {
        case '+':
            return 'text-green-100 dark:text-green-300'
        case '-':
            return 'text-red-100 dark:text-red-300'
        default:
            return 'text-gray-100 dark:text-gray-200'
    }
})

const modifierValue = computed<string>(() => {
    if (props.attribute === Attribute.DURABILITY && !props.modifier) return '∞'

    return `${props.modifierType ?? ''}${props.modifier}`
})
</script>

<template>
    <span
        class="rounded-full inline-flex items-center justify-between gap-1 p-1 border-(--ui-bg) border-2"
        :class="bgColor"
    >
        <figure
            class="bg-gray-700 rounded-[50%] w-8 h-8 inline-flex items-center justify-center"
        >
            <UIcon
                :name="iconByAttribute.get(attribute)"
                :class="fgColor"
            />
        </figure>
        <span class="w-8 text-center text-gray-800 font-bold"> {{ modifierValue }} </span>
    </span>
</template>
