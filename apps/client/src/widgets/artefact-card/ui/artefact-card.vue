<script setup lang="ts">
import type { Artefact } from '@/entities/artefact'
import { ArtefactSlot } from '@/entities/artefact'
import { DurabilityBadge, StatBadge } from '@/widgets/badge'

interface Props {
    artefact: Artefact
}

defineProps<Props>()

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
            <div class="text-center mb-4">
                <h3
                    :id="artefact.name"
                    class="kd-h3 text-gray-900 dark:text-gray-200 text-2xl"
                >
                    {{ artefact.name }}
                </h3>
                <span class="text-sm capitalize text-gray-600 dark:text-gray-400 capi">{{
                    artefact.slot
                }}</span>
            </div>

            <figure
                class="relative flex min-h-[120px] justify-center before:absolute before:top-[50%] before:left-[50%] before:z-[0] before:mr-4 before:h-auto before:w-[65%] before:-translate-[50%] before:rounded-full before:bg-purple-50 before:pb-[65%] dark:before:bg-purple-400 dark:before:opacity-35"
            >
                <img
                    :src="artefact.image.url"
                    :alt="artefact.name"
                    class="w-full h-48 object-contain z-10"
                />
            </figure>

            <div class="flex flex-col gap-2">
                <durability-badge :value="artefact.durability ?? 0" />
                <div v-if="artefact.bonus?.length" class="flex flex-wrap gap-2">
                    <stat-badge
                        v-for="bonus in artefact.bonus"
                        :key="bonus.id"
                        :characteristic="bonus.characteristic"
                        :value="bonus.value"
                        :is-negative="bonus.isNegative"
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
