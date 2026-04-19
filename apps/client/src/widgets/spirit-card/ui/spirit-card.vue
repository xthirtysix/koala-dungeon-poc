<script setup lang="ts">
import { computed } from 'vue'
import {
    type Spirit,
    BG_PRIMARY_BY_PLACE,
    BG_SECONDARY_BY_PLACE,
    ICON_BY_PLACE,
    RING_BY_PLACE,
} from '@/entities/spirit'
import { KdCard } from '@/shared/ui/kd-card'
import { AchievementBadge } from '@/entities/achievement'
import { useSpiritData } from '../model/use-spirit-data.composable'

const props = defineProps<{
    spirit: Spirit
    place: number
    withData?: boolean
    vertical?: boolean
    achievements?: boolean
}>()

const { stats, borderColor } = useSpiritData({
    spirit: props.withData ? props.spirit : null,
    place: props.place > 3 ? 0 : props.place,
})

const rootClasses = computed(() => {
    const classes = [
        props.vertical
            ? 'gap-3 grid-cols-[1fr_max-content] p-3'
            : 'grid-cols-[1fr_max-content] items-center',
        `${BG_PRIMARY_BY_PLACE.get(props.place) ?? 'bg-gray-50/20'} dark:text-gray-400  relative grid  min-h-0 w-auto grid-rows-[min-content_1fr] border-0 justify-stretch rounded-3xl shadow-md sm:p-3`,
    ]

    return classes.filter(Boolean).join(' ')
})

const headerClasses = computed(() => {
    const classes = [
        props.vertical ? 'col-span-full' : 'px-3',
        props.withData ? 'flex-row-reverse justify-end' : '',
        'dark:text-default flex gap-3 items-center kd-h3 mb-0 h-auto shrink-1 border-0 font-amatic text-2xl leading-none text-gray-800 sm:p-0',
    ]
    return classes.filter(Boolean).join(' ')
})

const bodyClasses = computed(() => {
    const classes = [
        props.vertical
            ? `${RING_BY_PLACE.get(props.place) ?? ''} text-default ring-1 rounded-2xl bg-white/90 dark:bg-gray-900/80 x-4 p-3 sm:py-8`
            : 'sm:p-0 sm:pr-3',
        'card__stats grid w-full text-sm text-default font-bold capitalize',
    ]
    return classes.filter(Boolean).join(' ')
})

const footerClasses = computed(() => {
    const classes = [
        !props.vertical && props.withData ? 'sm:mt-3' : '',
        props.vertical
            ? ''
            : `col-span-full ${BG_SECONDARY_BY_PLACE.get(props.place) ?? 'bg-gray-100/30 dark:bg-gray-800/30'} border-t border-t-1 sm:-mx-3 sm:-mb-3`,
        props.place < 4
            ? `${borderColor?.value || ''}`
            : ' border-gray-200 dark:border-gray-800',
        'relative items-center pl-3 flex sm:p-0',
    ]
    return classes.filter(Boolean).join(' ')
})

const cardClasses = computed(() => ({
    root: rootClasses.value,
    header: headerClasses.value,
    body: bodyClasses.value,
    footer: footerClasses.value,
}))

const carouselUiClasses = computed(() => {
    const arrowsClasses = `${borderColor?.value} bg-gray-100 size-8 cursor-pointer border-1 ring-0 dark:bg-gray-800/80 disabled:hidden`

    return {
        root: 'h-full content-center w-full items-start justify-start z-2',
        container: props.vertical
            ? 'h-[300px]'
            : 'h-auto py-2 sm:mx-1 min-h-[6.375rem]',
        item: props.vertical ? 'basis-1/3' : 'basis-1/8',
        prev: [
            props.vertical
                ? 'left-1/2 -translate-x-1/2 translate-y-12 '
                : 'bottom-1/2 -translate-y-1/2 start-3 sm:start-3',
            arrowsClasses,
        ].join(' '),
        next: [
            props.vertical
                ? 'bottom-2 left-1/2  -translate-x-1/2 -translate-y-12'
                : 'bottom-1/2 -translate-y-1/2 end-3 sm:end-3',
            arrowsClasses,
        ].join(' '),
    }
})
</script>

<template>
    <kd-card :ui="cardClasses">
        <template #header>
            <h3 class="leading-[50px]">{{ spirit.nickname }}</h3>
            <img
                v-if="ICON_BY_PLACE.has(place)"
                :src="ICON_BY_PLACE.get(place)"
                width="50"
                height="50"
                class="-order-1"
            />
        </template>

        <template v-if="stats && stats.length">
            <dl
                :class="
                    vertical
                        ? 'grid grid-cols-[min-content_1fr] items-baseline gap-x-4 gap-y-8'
                        : `hidden md:grid md:grid-flow-col md:grid-cols-6 md:grid-rows-2 md:justify-items-start md:gap-x-3`
                "
            >
                <template v-for="stat in stats" :key="stat.label">
                    <dt class="font-normal">{{ stat.label }}</dt>
                    <dd class="text-right text-lg">
                        {{ stat.value }}
                    </dd>
                </template>
            </dl>
        </template>

        <template v-if="achievements && !!spirit.achievements?.length" #footer>
            <h4 class="sr-only">Достижения</h4>
            <u-carousel
                v-slot="{ item }"
                :items="spirit.achievements"
                :autoplay="{
                    delay: 4000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                }"
                :arrows="
                    vertical
                        ? spirit.achievements.length > 3
                        : spirit.achievements.length > 8
                "
                :options="{
                    duration: 10,
                    skipSnaps: true,
                    dragFree: true,
                }"
                :ui="carouselUiClasses"
                loop
                :orientation="vertical ? 'vertical' : 'horizontal'"
            >
                <achievement-badge
                    :achievement="item"
                    size="lg"
                    side="top"
                    hint
                />
            </u-carousel>
        </template>
    </kd-card>
</template>
