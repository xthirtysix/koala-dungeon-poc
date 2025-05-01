<script setup lang="ts">
import type { Artefact } from '@/entities/artefact'
import { ArtefactSlot } from '@/entities/artefact'
import { DurabilityBadge, StatBadge } from '@/widgets/badge'

interface Props {
    artefact: Artefact
}

defineProps<Props>()

const getSlotLabel = (slot: ArtefactSlot): string => {
    const labels: Record<ArtefactSlot, string> = {
        [ArtefactSlot.Belt]: 'Пояс',
        [ArtefactSlot.Chest]: 'Нагрудник',
        [ArtefactSlot.Feet]: 'Обувь',
        [ArtefactSlot.Hands]: 'Перчатки',
        [ArtefactSlot.Head]: 'Шлем',
        [ArtefactSlot.Weapon]: 'Оружие',
    }
    return labels[slot] ?? ''
}
</script>

<template>
    <u-card
        class="h-full"
        :ui="{
            root: 'rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 border-0',
            body: 'h-full',
        }"
    >
        <div class="flex flex-col gap-4 h-full">
            <div class="text-center">
                <h3 :id="artefact.name" class="kd-h3 text-gray-900 dark:text-gray-200">
                    {{ artefact.name }}
                </h3>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{
                    getSlotLabel(artefact.slot)
                }}</span>
            </div>

            <figure
                class="relative flex min-h-[120px] justify-center before:absolute before:top-[50%] before:left-[50%] before:z-[0] before:mr-4 before:h-auto before:w-[65%] before:-translate-[50%] before:rounded-full before:bg-purple-50 before:pb-[65%] dark:before:bg-purple-400 dark:before:opacity-35"
            >
                <img
                    :src="`/artefacts/${artefact.id}.png`"
                    :alt="artefact.name"
                    class="w-full h-48 object-contain z-10"
                >
            </figure>

            <div class="flex flex-col gap-2">
                <durability-badge :value="artefact.durability ?? 0" />
                <div class="flex flex-wrap gap-2">
                    <stat-badge
                        v-for="(value, stat) in artefact.stats"
                        :key="stat"
                        :stat="stat"
                        :value="value ?? 0"
                        class="flex-1"
                    />
                </div>
            </div>

            <p class="text-sm mt-auto text-gray-600 dark:text-gray-400">
                {{ artefact.description }}
            </p>
        </div>
    </u-card>
</template>
