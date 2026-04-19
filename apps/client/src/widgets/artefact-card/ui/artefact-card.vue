<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import {
    BG_BY_TYPE,
    BORDER_BY_TYPE,
    RING_BY_TYPE,
    type Artefact,
} from '@/entities/artefact'
import { PropertyBadge } from '@/widgets/property-badge'
import { KdCard } from '@/shared/ui/kd-card'
import { useArtefactProperties } from '@/entities/artefact/model/artefact-properties.composable'

const props = defineProps<{ artefact: Artefact }>()

const isLoading = ref(true)

const image = new Image()
image.src = props.artefact.image.url

image.onload = () => {
    isLoading.value = false
}
image.onerror = () => {
    isLoading.value = false
}

onUnmounted(() => {
    image.onload = null
    image.onerror = null
})

const cardBackground = computed(() => {
    return BG_BY_TYPE.get(props.artefact.slot)
})

const borderColor = computed(() => {
    return BORDER_BY_TYPE.get(props.artefact.slot)
})

const ringColor = computed(() => {
    return RING_BY_TYPE.get(props.artefact.slot)
})

const { propertiesShort, propertiesLong, getPropertyClass } =
    useArtefactProperties(props.artefact)
</script>

<template>
    <kd-card
        :ui="{
            root: [
                'kd-artefacts relative grid min-h-0 w-auto grid-rows-[min-content_1fr] justify-stretch rounded-3xl p-3 duration-200 shadow-md hover:shadow-lg',
                cardBackground,
            ].join(' '),
            body: 'z-2 align-center flex h-full w-full grow-1 flex-col gap-4 p-0 sm:p-0',
            header: 'z-1 kd-h2 mb-0 h-auto shrink-1 border-0 font-amatic text-2xl leading-none pt-3 pb-5 sm:px-0 sm:py-2 sm:mb-2',
        }"
    >
        <template #header>
            {{ artefact.name }}
        </template>

        <div
            class="kd-gradient pointer-events-none absolute top-0 left-0 h-[10%] w-full rounded-lg"
        />

        <section
            class="z-1 order-2 mx-[-0.25rem] my-[-1.25rem] flex flex-row items-center rounded-sm border bg-white/90 px-3 text-sm font-bold capitalize md:flex-col lg:flex-row dark:bg-gray-900/80"
            :class="borderColor"
        >
            <h4 class="sr-only">Характеристики</h4>
            <span class="mr-auto leading-10">{{ artefact.slot }}</span>
            <u-popover
                mode="hover"
                :ui="{
                    content: [
                        ringColor,
                        'rounded-3xl bg-white p-6 dark:bg-gray-900',
                    ].join(' '),
                }"
            >
                <section class="relative flex cursor-help">
                    <h4 class="sr-only">Бонусы характеристик</h4>
                    <ul class="flex flex-wrap gap-2">
                        <li v-for="(value, key) in propertiesShort" :key="key">
                            <property-badge
                                v-if="value !== undefined"
                                :property="key"
                                :class="getPropertyClass(value)"
                                class="font-amatic text-2xl font-bold uppercase"
                            >
                                {{ value }}
                            </property-badge>
                        </li>
                    </ul>
                </section>

                <template #content>
                    <ul
                        class="font-amatic mb-3 grid gap-3 text-3xl font-bold capitalize"
                    >
                        <li v-for="(value, key) in propertiesLong" :key="key">
                            <property-badge
                                v-if="value !== undefined"
                                :property="key"
                                :class="getPropertyClass(value)"
                                class="font-amatic text-2xl font-bold uppercase"
                            >
                                {{ value }}
                            </property-badge>
                        </li>
                    </ul>
                </template>
            </u-popover>
        </section>

        <figure
            class="relative z-0 order-1 mx-auto flex aspect-[20/15] w-full items-center justify-center rounded-t-2xl border bg-white/90 dark:bg-gray-900/80"
            :class="borderColor"
        >
            <u-skeleton v-if="isLoading" class="h-64 w-full rounded-t-2xl" />
            <img
                v-else
                :src="artefact.image.url"
                :alt="artefact.name"
                class="obj z-10 h-64 w-full object-contain p-4"
            />
        </figure>

        <p
            class="text-default order-4 grow-1 rounded-b-2xl border bg-white/90 p-2 text-justify text-sm dark:bg-gray-900/80"
            :class="borderColor"
        >
            {{ artefact.description }}
        </p>
    </kd-card>
</template>
