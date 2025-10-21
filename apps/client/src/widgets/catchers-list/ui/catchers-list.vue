<script setup lang="ts">
import { CatcherCard } from '@/widgets/catcher-card'
import type { Catcher } from '@/entities/catcher/model/types'

interface Props {
  catchers: Catcher[]
  loading: boolean
  error: string | null
}

defineProps<Props>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <div class="text-red-600 font-medium mb-2">Ошибка загрузки</div>
        <p class="text-red-500 text-sm">{{ error }}</p>
        <button
          @click="emit('retry')"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    </div>

    <div v-else-if="catchers.length === 0" class="text-center py-12">
      <div class="text-gray-500">
        <div class="text-6xl mb-4">👻</div>
        <p class="text-lg">Пока нет ловцов</p>
        <p class="text-sm">Будьте первым!</p>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 py-8">
      <catcher-card
        v-for="catcher in catchers"
        :key="catcher.id"
        :catcher="catcher"
      />
    </div>
  </div>
</template>
