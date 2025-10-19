<script setup lang="ts">
import { CharacterEquipmentSlot } from '@/widgets/character-sheet'
import { Artefact, ArtefactSlot } from '@/entities/artefact'

defineProps<{
    equipment: [ArtefactSlot, Artefact | null][]
}>()
</script>

<template>
    <ul class="grid grid-flow-col grid-cols-subgrid grid-rows-subgrid gap-4">
        <li v-for="(item, idx) in equipment" :key="`slot-${idx}`">
            <character-equipment-slot
                v-if="item"
                class="h-full"
                :artefact="item[1]"
                :slot="item[0]"
            />
        </li>
    </ul>
</template>
