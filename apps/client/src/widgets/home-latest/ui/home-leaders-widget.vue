<script setup lang="ts">
import type { Spirit } from '@/entities/spirit'
import { LeaderCard } from '@/widgets/leader-card'

defineProps<{
    spirits: Spirit[]
    isLoading: boolean
    isError: boolean
}>()
</script>

<template>
    <div>
        <h2 class="kd-h2">Сильнейшие духи</h2>

        <ul v-if="isLoading" class="grid grid-cols-1 gap-8">
            <li v-for="n in 5" :key="n">
                <u-skeleton class="h-[132px] w-full rounded-lg" />
            </li>
        </ul>

        <div
            v-else-if="spirits.length === 0"
            class="font-amatic text-center text-2xl font-bold text-gray-500"
        >
            Призываем духов 👻
        </div>

        <ul v-else class="grid grid-cols-1 gap-8">
            <li v-for="(spirit, idx) in spirits" :key="spirit.id">
                <leader-card
                    :ui="{ body: 'pb-0 sm:pt-4 sm:pb-1' }"
                    :place="idx + 1"
                    :name="spirit.nickname"
                    :interference-wheel-spins="spirit.obstacleSpins ?? 0"
                    :help-wheel-spins="spirit.helpSpins ?? 0"
                    :deferred-interferences="spirit.scheduledSpins ?? 0"
                    :total-donations="spirit.amount ?? 0"
                    :achievements="spirit.achievements ?? []"
                    :rerolls="spirit.reroll ?? 0"
                    hide-stats
                />
            </li>
        </ul>
    </div>
</template>
