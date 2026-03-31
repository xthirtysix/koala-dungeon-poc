<script setup lang="ts">
import { CharsheetProgressbar } from '@/shared/ui/charsheet-progressbar'
import { XP_PER_LEVEL, type CharacterResource } from '@/entities/character'

defineProps<{
    resources: CharacterResource[]
}>()
</script>

<template>
    <section v-if="resources">
        <h3 class="sr-only">Здоровье и опыт</h3>

        <div
            class="font-amatic col-span-full grid grid-cols-subgrid grid-rows-[1fr_min-content_1fr_min-content] items-center text-2xl"
        >
            <template v-for="resource in resources" :key="resource.label">
                <span
                    class="text-md sr-only font-semibold lowercase @sm/char:not-sr-only"
                >
                    {{
                        resource.label.toLowerCase() === 'опыт'
                            ? `уровень ${Math.floor(resource.value / resource.max) + 1}`
                            : resource.label
                    }}
                </span>
                <span class="-col-start-1 justify-self-end font-bold">
                    {{
                        resource.label.toLowerCase() === 'опыт'
                            ? resource.value % XP_PER_LEVEL
                            : resource.value
                    }}/{{ resource.max }}
                </span>
                <charsheet-progressbar
                    :value="
                        resource.label.toLowerCase() === 'опыт'
                            ? resource.value % XP_PER_LEVEL
                            : resource.value
                    "
                    :max="resource.max"
                    :color="resource.color"
                    :background-color="resource.backgroundColor"
                    class="col-span-full"
                />
            </template>
        </div>
    </section>
</template>
