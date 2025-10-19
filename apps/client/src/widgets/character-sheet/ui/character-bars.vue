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
            class="grid grid-cols-[max-content_1fr_max-content] items-center gap-3 @sm/char:grid-cols-[auto_auto_1fr_auto]"
        >
            <template
                v-for="resource in resources"
                :key="resource.label"
                class="grid"
            >
                <img
                    :src="resource.icon"
                    :alt="resource.label"
                    class="h-8 w-8"
                />
                <span
                    class="sr-only text-lg font-semibold @sm/char:not-sr-only"
                >
                    {{
                        resource.label.toLowerCase() === 'опыт'
                            ? `Уровень ${Math.floor(resource.value / resource.max) + 1}`
                            : resource.label
                    }}
                </span>
                <charsheet-progressbar
                    :value="
                        resource.label.toLowerCase() === 'опыт'
                            ? resource.value % XP_PER_LEVEL
                            : resource.value
                    "
                    :max="resource.max"
                    :color="resource.color"
                />
                <span class="font-bold">
                    {{
                        resource.label.toLowerCase() === 'опыт'
                            ? resource.value % XP_PER_LEVEL
                            : resource.value
                    }}/{{ resource.max }}
                </span>
            </template>
        </div>
    </section>
</template>
