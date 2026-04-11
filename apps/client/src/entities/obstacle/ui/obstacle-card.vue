<script setup lang="ts">
import { computed } from 'vue'
import {
    BG_BY_TYPE,
    BORDER_BY_TYPE,
} from '../consts/obstacle-colors.consts'
import { KdCard } from '@/shared/ui/kd-card'
import type { Obstacle } from '@/entities/obstacle'

const props = defineProps<{
    obstacle: Obstacle
    isUnlocked: boolean
}>()

const cardColor = computed(() => {
    return BG_BY_TYPE.get(props.obstacle.type)
})

const borderColor = computed(() => {
    return BORDER_BY_TYPE.get(props.obstacle.type)
})
</script>

<template>
    <kd-card
        :ui="{
            root: [
                `kd-obstacles relative flex ${obstacle.description || obstacle.isUnlocked ? 'md:aspect-[12/9]' : ''} h-full flex-col overflow-hidden rounded-3xl p-0 shadow-md ring-1 duration-200 sm:p-0`,
                cardColor,
            ].join(' '),
            header: `relative z-1 md:min-h-[4rem] border-none text-gray-900 dark:text-gray-300 p-3 ${obstacle.description || obstacle.isUnlocked ? 'pt-5' : ''} sm:px-3 sm:pt-5`,
            body: `grid h-full grid-rows-[1fr_min-content] overflow-hidden ${obstacle.description || obstacle.isUnlocked ? 'p-3 sm:p-3' : 'p-0 sm:p-0 sm:pt-2'}`,
            footer: 'none',
        }"
    >
        <div class="kd-gradient absolute top-0 left-0 h-4 w-full rounded-lg" />
        <template #header>
            <h4 class="line-clamp-2 text-2xl font-semibold">
                {{ obstacle.name }}
            </h4>
        </template>

        <div
            v-if="obstacle.description && obstacle.isUnlocked"
            class="relative flex h-full flex-1 overflow-hidden rounded-t-2xl border-1 bg-white/90 p-3 text-black dark:bg-gray-900/90 dark:text-gray-300"
            :class="borderColor"
        >
            <p
                v-else-
                class="relative z-1 m-0 overflow-y-auto text-sm"
            >
                {{ obstacle.description }}
            </p>
        </div>
        <section
            v-if="obstacle.description || obstacle.isUnlocked"
            class="z-1 mx-[-0.25rem] my-[-0.1rem] rounded-t-sm rounded-b-2xl border bg-white/90 px-3 py-2 text-sm font-bold text-black capitalize dark:bg-gray-900/90 dark:text-gray-300"
            :class="borderColor"
        >
            {{ obstacle.type }}
        </section>
    </kd-card>
</template>
