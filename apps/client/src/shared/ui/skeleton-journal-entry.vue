<script setup lang="ts">
// Пустой setup, так как пропсы не нужны
</script>

<template>
  <u-card
    :ui="{
      root: 'relative overflow-hidden rounded-lg p-0 bg-white dark:bg-gray-800 shadow-sm',
      body: 'flex items-start gap-3 p-4 sm:p-2',
    }"
  >
    <div class="relative z-1 flex w-15 items-center justify-center p-2.5">
      <div class="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
    <div class="relative z-1 flex-1">
      <div class="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-2">
        <span class="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700 animate-pulse inline-block"></span>
        <span class="h-5 w-20 rounded bg-primary/20 dark:bg-primary/30 animate-pulse inline-block ml-2"></span>
      </div>
      <p class="mt-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></p>
      <p class="mt-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></p>
    </div>
  </u-card>
</template>
