<script setup lang="ts">
import { artefactsApi, BORDER_BY_TYPE } from '@/entities/artefact'
import { POPULAR_ARTEFACTS } from '../consts/marathon-dashboard.consts'
import DashboardTile from './dashboard-tile.vue'
import { useQuery } from '@tanstack/vue-query'

const { data: artefacts } = useQuery({
    queryKey: ['popular-artefacts'],
    queryFn: () => artefactsApi.getByNames(POPULAR_ARTEFACTS),
})
</script>

<template>
    <dashboard-tile
        :ui="{
            root: 'grid h-full grid-rows-[auto_1fr]',
            body: 'justify-around my-auto flex items-center gap-4',
        }"
        class="@container"
    >
        <template #header> Самые популярные артефакты </template>

        <template v-if="artefacts?.data && artefacts.data.length > 0">
            <div
                v-for="artefact in artefacts.data"
                :key="artefact.id"
                class="flex flex-col items-center gap-2"
            >
                <div
                    class="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-md border-2 bg-white/60 pt-2 shadow-sm md:@max-sm:h-20 md:@max-sm:w-20 dark:bg-gray-900/35"
                    :class="BORDER_BY_TYPE.get(artefact.slot)"
                >
                    <img
                        v-if="artefact.image?.url"
                        :src="artefact.image.url"
                        :alt="artefact.name"
                        class="h-full w-full object-contain p-2"
                    />
                    <u-skeleton v-else class="h-full w-full" />
                </div>
                <p
                    class="font-amatic truncate text-center text-2xl font-bold @max-sm:text-sm"
                >
                    {{ artefact.name }}
                </p>
            </div>
        </template>
    </dashboard-tile>
</template>
