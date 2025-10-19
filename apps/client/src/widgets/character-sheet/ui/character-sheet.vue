<script setup lang="ts">
import {
    CharacterBars,
    CharacterEquipmentGrid,
    CharacterAttributes,
    CharacterGold,
} from '@/widgets/character-sheet'
import { useCharacter } from '@/entities/character'

const emit = defineEmits<{
    (e: 'token-click'): void
}>()

const { resources, attributes, equipment, data: character } = useCharacter()
</script>

<template>
    <u-card
        :ui="{
            root: 'rounded-3xl',
            body: 'p-2 sm:p-2 grid grid-rows-[max-content_1fr] grid-cols-[max-content_1fr_1fr] @sm:grid-cols-[1.3fr_1fr_1fr] grid-rows-[max-content_1fr_1fr_1fr_1fr] gap-4',
        }"
    >
        <character-bars :resources="resources" class="col-span-full mb-6" />
        <character-equipment-grid
            :equipment="equipment"
            class="col-start-2 -col-end-1 row-start-2 -row-end-1"
        />
        <div class="col-end-2 row-start-2 -row-end-1 mt-0 flex flex-col pr-2">
            <character-attributes
                :attributes="attributes"
                class="mb-8"
                compact
            />
            <character-gold :amount="character?.coins || 0" />
            <img
                src="/token.png"
                class="col-start-1 col-end-2 row-start-4 -row-end-1 hidden h-auto w-full items-end @sm/char:mt-auto @sm/char:block"
                @click="$emit('token-click')"
            />
        </div>
    </u-card>
</template>
