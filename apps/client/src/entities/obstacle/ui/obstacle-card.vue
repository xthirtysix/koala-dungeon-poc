<script setup lang="ts">
import { computed } from 'vue'
import type { Obstacle } from '@/entities/obstacle'
import { obstacleColorByType } from '@/entities/obstacle'

const props = defineProps<{
    obstacle: Obstacle
    isUnlocked: boolean
}>()

const cardColor = computed<string>(() => {
    return `bg-${obstacleColorByType.get(props.obstacle.type)}-200/90`
})

const borderColor = computed<string>(() => {
    return `border-${obstacleColorByType.get(props.obstacle.type)}-300`
})
</script>

<template>
    <u-card
        :ui="{
            root: [
                'kd-obstacles relative flex md:aspect-[12/9] h-full flex-col overflow-hidden rounded-3xl p-0 shadow-md ring-1 duration-200 sm:p-0',
                cardColor,
            ].join(' '),
            header: 'relative z-1 min-h-[4rem] border-none text-gray-900 sm:px-3 sm:pt-5',
            body: 'grid h-full grid-rows-[1fr_min-content] overflow-hidden sm:p-3 sm:pt-2',
        }"
    >
        <div class="kd-gradient absolute top-0 left-0 h-4 w-full rounded-lg" />
        <template #header>
            <h4 class="line-clamp-2 text-2xl font-semibold">
                {{ obstacle.name }}
            </h4>
        </template>

        <div
            class="relative flex h-full flex-1 overflow-hidden rounded-t-2xl border-1 bg-gray-50/90 p-3"
            :class="borderColor"
        >
            <u-icon
                v-if="!obstacle.description || !obstacle.isUnlocked"
                name="i-material-symbols:lock-outline"
                class="m-auto mx-auto text-5xl"
                :class="`text-${obstacleColorByType.get(obstacle.type)}-200`"
            />
            <p
                v-else
                class="relative z-1 m-0 overflow-y-auto text-sm dark:text-black"
            >
                {{ obstacle.description }}
            </p>
        </div>
        <section
            class="z-1 mx-[-0.25rem] my-[-0.1rem] rounded-t-sm rounded-b-2xl border bg-gray-50/90 px-3 py-2 text-sm font-bold capitalize dark:text-black"
            :class="borderColor"
        >
            {{ obstacle.type }}
        </section>
    </u-card>
</template>
