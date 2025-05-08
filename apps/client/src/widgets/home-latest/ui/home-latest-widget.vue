<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { journalApi } from '@/entities/journal'
import obstaclesApi from '@/pages/obstacles/api/obstacles'
import { LatestJournalEntries } from '@/widgets/journal'
import { LatestObstaclesWidget } from '@/widgets/latest-obstacles'
import { spiritApi } from '@/entities/spirit'
import type { JournalEntry } from '@/entities/journal/model/types'
import type { Obstacle } from '@/entities/obstacle/model/types'
import type { Spirit } from '@/entities/spirit/model/types'
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
        const [journalRes, obstaclesRes, spiritsRes] = await Promise.all([
            journalApi.fetchEntries({ page: 1, pageSize: 7 }),
            obstaclesApi.fetchActiveObstacles(),
            spiritApi.fetchSpirits({ page: 1, pageSize: 5, isHidden: false }),
        ])
        journalEntries.value = journalRes.entries
        obstacles.value = obstaclesRes
        spirits.value = spiritsRes.spirits
    } catch (e) {
        isError.value = true
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
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
            :spirits="spirits"
            :is-loading="isLoading"
            :is-error="isError"
        />
    </div>
</template>
