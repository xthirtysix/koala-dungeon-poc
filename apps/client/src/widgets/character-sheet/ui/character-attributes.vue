<script setup lang="ts">
import { type CharacterAttribute } from '@/entities/character'

defineProps<{
    attributes: CharacterAttribute[]
}>()
</script>

<template>
    <section>
        <h3 class="sr-only">Характеристики</h3>

        <ul v-if="attributes" class="grid w-full gap-3">
            <li
                v-for="attribute in attributes"
                :key="attribute.key"
                class="flex w-full items-center gap-2 rounded-lg"
            >
                <img
                    :src="attribute.icon"
                    :alt="attribute.label"
                    :class="'h-8 w-8'"
                    :title="attribute.label"
                />
                <span
                    class="sr-only text-lg font-semibold uppercase @sm/char:not-sr-only"
                    :title="attribute.label"
                >
                    {{ attribute.short }}
                </span>
                <span
                    class="text-primary ml-auto text-center text-lg font-bold select-none"
                >
                    {{ attribute.value }}
                </span>
            </li>
        </ul>
    </section>
</template>
