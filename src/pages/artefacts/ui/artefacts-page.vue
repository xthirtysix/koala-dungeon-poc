<script setup lang="ts">
import { ref, computed } from 'vue'
import artefactsData from '../api/artefacts-data'
import { ArtefactCard, typeLabels } from '@/entities/artefact'
import type { Artefact } from '@/entities/artefact'

const artefactsRef = ref<Artefact[]>(artefactsData)

const artefacts = computed<Artefact[]>(() => {
    if (!filter.value) return artefactsRef.value

    return artefactsRef.value.filter((a: Artefact) => a.type === filter.value)
})

const filter = ref<Artefact['type'] | null>(null)

const onFilterClick = (type: Artefact['type']) => {
    filter.value = type
}

const onClearClick = () => {
    filter.value = null
}
</script>

<template>
    <UButtonGroup orientation="horizontal" class="mx-auto px-4 py-8">
        <UButton
            color="neutral"
            :variant="filter === null ? 'subtle' : 'outline'"
            label="Все"
            @click="onClearClick"
        />
        <UButton
            v-for="type in typeLabels.keys()"
            :key="type"
            color="neutral"
            :variant="type === filter ? 'subtle' : 'outline'"
            :label="typeLabels.get(type)"
            @click="onFilterClick(type)"
        />
    </UButtonGroup>
    <div class="container mx-auto px-4 mb-4">
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
            <ArtefactCard
                v-for="artefact in artefacts"
                :key="artefact.id"
                :artefact="artefact"
            />
        </div>
    </div>
</template>
