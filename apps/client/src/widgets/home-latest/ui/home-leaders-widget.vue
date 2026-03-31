<script setup lang="ts">
import { type Spirit } from '@/entities/spirit'
import { SpiritCard } from '@/widgets/spirit-card'

defineProps<{
    spirits: Spirit[]
    isLoading: boolean
    isError: boolean
}>()

const gridClasses = 'grid grid-cols-1 gap-6'
</script>

<template>
    <div>
        <h2 class="kd-h2">Сильнейшие духи</h2>

        <ul v-if="isLoading" :class="gridClasses">
            <li v-for="n in 5" :key="n">
                <u-skeleton class="h-[82px] w-full rounded-3xl" />
            </li>
        </ul>

        <div
            v-else-if="!spirits.length"
            class="font-amatic text-center text-2xl font-bold text-gray-500"
        >
            Призываем духов 👻
        </div>

        <ul v-else :class="gridClasses">
            <li v-for="(spirit, index) in spirits" :key="spirit.id">
                <spirit-card :spirit="spirit" :place="index + 1" />
            </li>
        </ul>
    </div>
</template>
