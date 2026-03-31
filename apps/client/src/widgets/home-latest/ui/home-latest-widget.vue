<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type JournalEntry, journalApi } from '@/entities/journal'
import { type Obstacle, obstaclesApi } from '@/entities/obstacle'
import { type Spirit, spiritApi } from '@/entities/spirit'
import { LatestJournalEntries } from '@/widgets/journal'
import { LatestObstaclesWidget } from '@/widgets/latest-obstacles'
import { HomeLeadersWidget } from '@/widgets/home-latest'

const journalEntries = ref<JournalEntry[]>([])
const obstacles = ref<Obstacle[]>([])
const spirits = ref<Spirit[]>([])
const isLoading = ref(true)
const isError = ref(false)

onMounted(async () => {
    isLoading.value = true
    isError.value = false
    try {
        const [journalResponse, obstaclesResponse, spiritsResponse] = await Promise.all([
            journalApi.getEntries({ page: 1, pageSize: 7 }),
            obstaclesApi.getActiveObstacles(),
            spiritApi.getSpirits({ page: 1, pageSize: 5, isHidden: false }),
        ])
        journalEntries.value = journalResponse.data
        obstacles.value = obstaclesResponse.data
        spirits.value = spiritsResponse.data
    } catch (e) {
        isError.value = true
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
        <latest-journal-entries
            :entries="journalEntries"
            :is-loading="isLoading"
            :error="isError"
        />
        <latest-obstacles-widget
            :obstacles="obstacles"
            :is-loading="isLoading"
            :is-error="isError"
        />
        <home-leaders-widget
            :spirits="spirits.filter(spirit => spirit.amount && spirit.amount > 0)"
            :is-loading="isLoading"
            :is-error="isError"
        />
    </div>
</template>
