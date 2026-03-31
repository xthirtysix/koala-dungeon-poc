<script setup lang="ts">
import { CharacterEquipmentSlot } from '@/widgets/character-sheet'
import { type Artefact } from '@/entities/artefact'
import { useCharacter, type CharacterSlot } from '@/entities/character'

defineProps<{
    equipment: [CharacterSlot, Artefact | null][]
}>()

const character = useCharacter()
</script>

<template>
    <ul class="grid grid-flow-row grid-cols-subgrid grid-rows-subgrid gap-4">
        <li v-for="(item, idx) in equipment" :key="`slot-${idx}`">
            <character-equipment-slot
                v-if="item"
                :artefact="item[1]"
                :slot="item[0]"
                :usages="character.data?.value?.equipment_usages?.[item[0]] ?? 0"
                class="h-full"
            />
        </li>
    </ul>
</template>
