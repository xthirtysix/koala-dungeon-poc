<script setup lang="ts">
import { JournalEntry as JournalEntryComponent } from '@/widgets/journal'

defineProps<{
    entries: any[]
    isLoading: boolean
    error: boolean
}>()
</script>

<template>
    <div>
        <h2 class="kd-h2">Последние события марафона</h2>

        <ul v-if="isLoading" class="flex flex-col gap-6" role="presentation">
            <li v-for="n in 5" :key="n">
                <u-skeleton class="h-20 w-full rounded-3xl" />
            </li>
        </ul>

        <div
            v-else-if="entries.length === 0"
            class="font-amatic text-center text-2xl font-bold text-gray-500"
        >
            Вносим записи в журнал ✍️
        </div>

        <ul v-else class="flex flex-col gap-6">
            <li v-for="(entry, idx) in entries" :key="idx">
                <journal-entry-component :entry="entry" />
            </li>
        </ul>
    </div>
</template>
