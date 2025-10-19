<script setup lang="ts">
import type { Spirit } from '@/entities/spirit'
import { LeaderCard } from '@/widgets/leader-card'

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
            v-else-if="spirits.length === 0"
            class="font-amatic text-center text-2xl font-bold text-gray-500"
        >
            Призываем духов 👻
        </div>

        <ul v-else :class="gridClasses">
            <li v-for="(spirit, idx) in spirits" :key="spirit.id">
                <leader-card
                    :place="idx + 1"
                    :name="spirit.nickname"
                    :interference-wheel-spins="spirit.obstacleSpins ?? 0"
                    :help-wheel-spins="spirit.helpSpins ?? 0"
                    :deferred-interferences="spirit.scheduledSpins ?? 0"
                    :total-donations="spirit.amount ?? 0"
                    :achievements="spirit.achievements ?? []"
                    :rerolls="spirit.reroll ?? 0"
                    compact
                />
            </li>
        </ul>
    </div>
</template>
