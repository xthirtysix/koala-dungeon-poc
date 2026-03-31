<script setup lang="ts">
defineProps<{
  marathon?: {
    startTime: string
    totalTime: number
  } | null
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatDuration = (totalTime: number) => {
  const hours = Math.floor(totalTime / 3600000)
  const minutes = Math.floor((totalTime % 3600000) / 60000)
  return `${hours}ч ${minutes}м`
}
</script>

<template>
  <div class="flex h-full w-full items-center justify-center p-8">
    <u-card
      :ui="{
        root: 'w-full max-w-md rounded-3xl',
        body: 'p-8 text-center',
      }"
    >
      <div class="mb-6">
        <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
          <svg
            class="h-8 w-8 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 class="mb-2 text-2xl font-bold text-gray-900">
          Марафон не активен
        </h2>
        <p class="text-gray-600">
          В данный момент марафон не проводится. Проверьте расписание и попробуйте позже.
        </p>
      </div>

      <div
        v-if="marathon"
        class="mb-6 rounded-2xl bg-gray-50 p-4"
      >
        <h3 class="mb-3 text-lg font-semibold text-gray-900">
          Информация о марафоне
        </h3>
        <div class="space-y-2 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>Начало:</span>
            <span class="font-medium">
              {{ formatDate(marathon.startTime) }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Длительность:</span>
            <span class="font-medium">
              {{ formatDuration(marathon.totalTime) }}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <u-button
          color="primary"
          size="lg"
          width="full"
          block
          @click="$router.push('/')"
        >
          Вернуться на главную
        </u-button>
        <u-button
          color="gray"
          variant="ghost"
          size="lg"
          block
          @click="window.location.reload()"
        >
          Обновить страницу
        </u-button>
      </div>
    </u-card>
  </div>
</template>
