<script setup lang="ts">
import { computed } from 'vue'
import { colorByArtefactSlot, type Artefact } from '@/entities/artefact'
import { DurabilityBadge, StatBadge } from '@/widgets/badge'

const props = defineProps<{ artefact: Artefact }>()

const cardBackground = computed<string>(() => {
    return `bg-${colorByArtefactSlot.get(props.artefact.slot)}-200/90`
})

const borderColor = computed<string>(() => {
    return `border-${colorByArtefactSlot.get(props.artefact.slot)}-300`
})
</script>

<template>
    <u-card
        :ui="{
            root: [
                'kd-artefacts transition-background relative grid aspect-[4/5.1] min-h-0 w-auto grid-rows-[min-content_1fr] justify-stretch rounded-3xl p-2 text-gray-400 shadow-md',
                cardBackground,
            ].join(' '),
            body: 'z-2 align-center flex h-full w-full grow-1 flex-col gap-4 p-2 text-black sm:p-2',
            header: 'z-1 kd-h3 mb-0 h-auto shrink-1 border-0 font-amatic text-2xl leading-none text-gray-900 sm:px-2 sm:pt-4 sm:pb-3',
        }"
    >
        <template #header>
            {{ artefact.name }}
        </template>

        <div
            class="kd-gradient pointer-events-none absolute top-0 left-0 h-[10%] w-full rounded-lg"
        />

        <section
            class="z-1 order-2 mx-[-0.25rem] my-[-1.25rem] flex items-center rounded-sm border bg-gray-50/90 px-3 py-2 text-sm font-bold capitalize dark:text-black"
            :class="borderColor"
        >
            <h4 class="sr-only">Характеристики</h4>
            <span class="mr-auto">{{ artefact.slot }}</span>
            <u-popover
                mode="hover"
                :ui="{
                    content: 'rounded-3xl bg-gray-50 p-6 dark:bg-slate-800',
                }"
            >
                <section class="relative flex cursor-help">
                    <h4 class="sr-only">Бонусы характеристик</h4>
                    <ul
                        v-if="artefact.bonus?.length"
                        class="flex flex-wrap gap-2"
                    >
                        <li v-for="bonus in artefact.bonus" :key="bonus.id">
                            <stat-badge
                                :characteristic="bonus.characteristic"
                                :value="bonus.value"
                                :is-negative="bonus.isNegative"
                                class="flex-1 text-black"
                            >
                                <template #label>
                                    <span
                                        class="font-amatic text-2xl font-bold capitalize"
                                        :class="`text-${bonus.isNegative ? 'red' : 'emerald'}-600`"
                                    >
                                        {{
                                            `${bonus.isNegative ? '-' : '+'}${bonus.value}`
                                        }}
                                    </span>
                                </template>
                            </stat-badge>
                        </li>
                    </ul>
                    <durability-badge
                        class="ml-2"
                        :value="artefact.durability ?? 0"
                    >
                        <template #label>
                            <span
                                class="font-amatic text-2xl font-bold text-gray-700 uppercase"
                            >
                                {{ artefact.durability || '∞' }}
                            </span>
                        </template>
                    </durability-badge>
                </section>

                <template #content>
                    <ul
                        v-if="artefact.bonus.length"
                        class="font-amatic mb-3 grid gap-3 text-3xl font-bold capitalize"
                    >
                        <li v-for="bonus in artefact.bonus" :key="bonus.id">
                            <stat-badge
                                :characteristic="bonus.characteristic"
                                :value="bonus.value"
                                :is-negative="bonus.isNegative"
                                class="flex-1"
                            />
                        </li>
                    </ul>
                    <durability-badge :value="artefact.durability ?? 0" />
                </template>
            </u-popover>
        </section>

        <figure
            class="relative z-0 order-1 mx-auto flex aspect-[20/15] w-full justify-center rounded-t-2xl border bg-purple-50"
            :class="borderColor"
        >
            <img
                :src="artefact.image.url"
                :alt="artefact.name"
                class="z-10 h-64 w-full object-contain"
            />
        </figure>

        <p
            class="order-4 grow-1 rounded-b-2xl border bg-gray-50/90 p-2 text-sm"
            :class="borderColor"
        >
            {{ artefact.description }}
        </p>
    </u-card>
</template>
