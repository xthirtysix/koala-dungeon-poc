<script setup lang="ts">
import moneyIcon from '@/app/assets/images/characteristics/money.png'

withDefaults(
    defineProps<{
        amount: number
    }>(),
    {
        amount: 0,
    },
)
</script>

<template>
    <div class="flex items-center gap-2">
        <img :src="moneyIcon" class="h-8 w-8" />
        <span class="@sm: sr-only text-lg font-semibold @sm/char:not-sr-only">
            Золото
        </span>
        <span class="ml-auto text-lg font-bold text-yellow-500">
            {{ amount }}
        </span>
    </div>
</template>
