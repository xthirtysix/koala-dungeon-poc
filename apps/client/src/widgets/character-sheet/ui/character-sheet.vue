<script setup lang="ts">
import {
    CharacterBars,
    CharacterEquipmentGrid,
    CharacterAttributes,
} from '@/widgets/character-sheet'
import { useCharacter } from '@/entities/character'
import tokenImg from '@/app/assets/images/token.webp'
import moneyIcon from '@/app/assets/images/characteristics/money.webp'

const { resources, attributes, equipment, data: character } = useCharacter()
</script>

<template>
    <div
        class="text-muted grid grid-cols-4 grid-rows-[max-content_max-content_1fr_1fr] gap-4 @sm:grid-cols-4"
    >
        <figure
            class="ring-default bg-elevated relative col-start-1 col-end-2 row-start-1 block aspect-square w-full self-center overflow-hidden rounded-lg border-2 border-white ring-1 dark:border-gray-900 dark:ring-gray-800"
        >
            <img
                :src="tokenImg"
                class="absolute top-0 left-0 h-[150%] w-[150%] object-cover"
                @click="$emit('token-click')"
            />
        </figure>
        <character-bars
            :resources="resources"
            class="col-start-2 -col-end-1 row-start-1 grid grid-cols-subgrid"
        />

        <div
            class="col-span-full row-start-2 mt-4 flex flex-col justify-between font-bold"
        >
            <character-attributes
                :attributes="[
                    ...attributes,
                    {
                        key: 'price',
                        label: 'Золото',
                        short: 'зол',
                        value: character?.coins || 0,
                        icon: moneyIcon,
                    },
                ]"
                class="mb-4"
                compact
            />
        </div>
        <character-equipment-grid
            :equipment="equipment"
            class="col-start-1 -col-end-1 row-start-3 -row-end-1"
        />
    </div>
</template>
