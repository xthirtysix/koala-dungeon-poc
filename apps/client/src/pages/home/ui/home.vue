<script setup lang="ts">
import { MarathonTimer } from '@/widgets/marathon-timer'
import { LatestJournalEntries } from '@/widgets/journal'
import { LatestObstaclesWidget } from '@/widgets/latest-obstacles'
</script>

<template>
    <h1 class="sr-only text-3xl font-bold">Марафон провинциальной стримерши</h1>
    <marathon-timer />

    <div class="grid grid-cols-3 gap-4">
        <div class="mt-8">
            <latest-journal-entries />
        </div>
        <div class="mt-8">
            <latest-obstacles-widget />
        </div>
    </div>
</template>
