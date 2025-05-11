<script setup lang="ts">
import { type Artefact, ArtefactSlot } from '@/entities/artefact'
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
        <div class="flex h-full flex-col gap-4">
            <div class="mb-4 text-center">
                <h3
                    :id="artefact.name"
                    class="kd-h3 text-2xl text-gray-900 dark:text-gray-200"
                >
                    {{ artefact.name }}
                </h3>
                <span
                    class="capi text-sm text-gray-600 capitalize dark:text-gray-400"
                    >{{ artefact.slot }}</span
                >
            </div>

            <figure
                class="relative mx-auto flex min-h-[120px] w-full max-w-[350px] justify-center before:absolute before:top-[50%] before:left-[50%] before:z-[0] before:mr-4 before:h-auto before:w-[65%] before:-translate-[50%] before:rounded-full before:bg-purple-50 before:pb-[65%] dark:before:bg-purple-400 dark:before:opacity-35"
            >
                <img
                    :src="artefact.image.url"
                    :alt="artefact.name"
                    class="z-10 h-48 w-full object-contain"
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

            <p class="mt-auto text-sm text-gray-600 dark:text-gray-400">
                {{ artefact.description }}
            </p>
        </div>
    </u-card>
</template>
