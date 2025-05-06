<script setup lang="ts">
import { JournalEntry as JournalEntryComponent } from '@/widgets/journal'
import { useJournalEntries } from '@/entities/journal'
import { onMounted } from 'vue'

const props = defineProps<{ pageSize?: number }>()
const { entries, isLoading, error, loadLatest } = useJournalEntries({
  pageSize: props.pageSize ?? 7,
})

onMounted(() => {
  loadLatest()
})
</script>

<template>
  <div>
    <h2 class="kd-h2">Последние события марафона</h2>
    <div v-if="isLoading" class="flex flex-col gap-4 py-4">
      <u-skeleton v-for="n in (props.pageSize ?? 5)" :key="n" class="h-20 w-full rounded-lg" />
    </div>
    <div v-else-if="error" class="font-amatic py-4 text-center text-2xl font-bold text-red-500">
      Не смогли получить события
    </div>
    <ul v-else class="flex flex-col gap-4">
      <li v-for="(entry, idx) in entries" :key="idx">
        <journal-entry-component :entry="entry" />
      </li>
    </ul>
  </div>
</template>
