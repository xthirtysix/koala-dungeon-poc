<script setup lang="ts">
import type { Journal } from '@/entities/journal'
import { JournalList } from '@/widgets/journal'

interface Props {
    journal: Journal
}

defineProps<Props>()
</script>

<template>
    <h1 class="kd-h1">Журнал событий</h1>
    <p class="mb-5">
        В подземелье могут происходить различные события, которые влияют на ход
        игры и создают уникальные ситуации.
    </p>
    <journal-list class="block mb-4" />
</template>
