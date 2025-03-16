<script setup lang="ts">
import { ref, computed } from 'vue'
import artefactsData from '../api/artefacts-data'
import { ArtefactCard, typeLabels } from '@/entities/artefact'
import type { Artefact } from '@/entities/artefact'

const artefacts = ref<Artefact[]>(artefactsData)
const page = ref<number>(1)
const itemsPerPage = ref(8)
const selectOptions = ref([4, 8, 16, 32])
const filter = ref<Artefact['type'] | null>(null)

const filteredArtefacts = computed<Artefact[]>(() => {
    if (!filter.value) return artefacts.value

    return artefacts.value.filter((a: Artefact) => a.type === filter.value)
})

const slicedArtefacts = computed<Artefact[]>(() => {
    const firstIndex = (page.value - 1) * itemsPerPage.value
    const lastIndex = firstIndex + itemsPerPage.value

    return filteredArtefacts.value.slice(firstIndex, lastIndex)
})


const onFilterClick = (type: Artefact['type']) => {
    filter.value = type
}

const onClearClick = () => {
    filter.value = null
}

watch(filter, () => {
    page.value = 1
})
</script>

<template>
    <UButtonGroup orientation="horizontal" class="mx-auto px-4 py-4">
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
    <div class="flex justify-between border-b border-(--ui-border) pb-4 px-4">
        <UPagination
            v-model:page="page"
            :items-per-page="itemsPerPage"
            :total="filteredArtefacts.length"
        />
        <USelect v-model="itemsPerPage" :items="selectOptions" class="w-24" />
    </div>
    <div class="container mx-auto px-4 my-4">
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            <ArtefactCard
                v-for="artefact in slicedArtefacts"
                :key="artefact.id"
                :artefact="artefact"
            />
        </div>
    </div>
    <div class="flex justify-between border-t border-(--ui-border) py-4 px-4">
        <UPagination
            v-model:page="page"
            :items-per-page="itemsPerPage"
            :total="filteredArtefacts.length"
        />
        <USelect v-model="itemsPerPage" :items="selectOptions" class="w-24" />
    </div>
</template>
