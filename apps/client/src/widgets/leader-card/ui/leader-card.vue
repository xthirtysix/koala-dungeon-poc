<script setup lang="ts">
import { computed } from 'vue'
import first from '@/app/assets/images/placements/first.png'
import second from '@/app/assets/images/placements/second.png'
import third from '@/app/assets/images/placements/third.png'
import fourth from '@/app/assets/images/placements/fourth.png'
import fifth from '@/app/assets/images/placements/fifth.png'
import { colorByPlacement } from '@/widgets/leader-card'
import { AchievementBadge, type Achievement } from '@/entities/achievement'

const props = defineProps<{
    place: number
    name: string
    interferenceWheelSpins: number
    helpWheelSpins: number
    deferredInterferences: number
    totalDonations: number
    achievements: Achievement[]
    rerolls: number
    compact?: boolean
}>()

const filteredAchievements = computed(() => {
    if (!Array.isArray(props.achievements)) {
        return []
    }
    return props.achievements
})

const cardClasses = computed(() => {
    if (!colorByPlacement.has(props.place)) {
        return 'bg-stone-50/20'
    }

    return `bg-${colorByPlacement.get(props.place)}-100/70`
})

const borderColor = computed(() => {
    return `border-${colorByPlacement.get(props.place)}-300`
})

const medalIcon = computed(() => {
    switch (props.place) {
        case 1:
            return first
        case 2:
            return second
        case 3:
            return third
        case 4:
            return fourth
        case 5:
            return fifth
        default:
            return ''
    }
})
</script>

<template>
    <u-card
        :ui="{
            root: [
                'transition-background relative grid  min-h-0 w-auto grid-rows-[min-content_1fr] justify-stretch rounded-3xl p-2 shadow-md',
                place < 4 ? 'kd-spirits' : 'dark:text-gray-400',
                cardClasses,
            ].join(' '),
            body: compact
                ? 'sm:m-0 sm:p-0 sm:pb-2'
                : 'z-2 h-full w-full grow-1 gap-6 p-2 text-black sm:p-2',
            header: [
                'relative z-2 flex items-center gap-2 border-none text-black sm:px-2 sm:py-0 sm:pt-2',
                compact ? 'flex-row-reverse justify-end' : '',
            ].join(' '),
        }"
    >
        <template #header>
            <h3
                class="kd-h2 mb-0 text-gray-900"
                :class="{ 'dark:text-gray-200': place > 3 }"
            >
                {{ name }}
            </h3>
            <img :src="medalIcon" width="50" height="50" />
        </template>

        <div
            class="kd-gradient pointer-events-none absolute top-0 left-0 h-4 w-full rounded-lg"
            :class="{ 'opacity-15': place > 3 }"
        />

        <div
            v-if="!compact"
            class="card grid h-full grid-rows-[min-content_1fr]"
        >
            <section
                class="card__stats z-1 flex items-center rounded-2xl border bg-stone-50/80 px-3 py-8 text-sm font-bold capitalize dark:text-black"
                :class="borderColor"
            >
                <dl class="grid grid-cols-[min-content_1fr] gap-x-2 gap-y-12">
                    <dt class="font-normal">Помехи</dt>
                    <dd>{{ interferenceWheelSpins || 0 }}</dd>
                    <dt class="font-normal">Помощь</dt>
                    <dd>{{ helpWheelSpins || 0 }}</dd>
                    <dt class="font-normal">Отложено</dt>
                    <dd>{{ deferredInterferences || 0 }}</dd>
                    <dt class="font-normal">Донаты</dt>
                    <dd>{{ totalDonations || 0 }}</dd>
                    <dt class="font-normal">Достижения</dt>
                    <dd>{{ achievements.length || 0 }}</dd>
                </dl>
            </section>

            <!-- Достижения справа -->
            <div
                v-if="filteredAchievements.length > 0"
                class="card__achievements flex flex-col items-center pl-4 md:hidden lg:flex"
            >
                <u-carousel
                    v-slot="{ item }"
                    :items="filteredAchievements"
                    orientation="vertical"
                    :autoplay="{
                        delay: 4000,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true,
                    }"
                    loop
                    :arrows="filteredAchievements.length > 5"
                    :options="{
                        duration: 10,
                        skipSnaps: true,
                        dragFree: true,
                    }"
                    :ui="{
                        root: 'h-full content-center',
                        container: 'h-[300px]',
                        item: 'basis-1/5',
                        prev: [
                            'left-1/2 size-8 -translate-x-1/2 translate-y-12 cursor-pointer border-1 bg-stone-100 ring-0 dark:!bg-stone-100 dark:text-black',
                            borderColor,
                        ].join(' '),
                        next: [
                            'bottom-2 left-1/2 size-8 -translate-x-1/2 -translate-y-12 cursor-pointer border-1 bg-stone-100 ring-0 dark:!bg-stone-100 dark:text-black',
                            borderColor,
                        ].join(' '),
                    }"
                >
                    <achievement-badge
                        :achievement="item as Achievement"
                        side="right"
                    />
                </u-carousel>
            </div>
        </div>
    </u-card>
</template>

<style scoped>
.card {
    display: grid;
    grid-template-areas:
        'place achievements'
        'stats achievements';
}
.card__place {
    grid-area: place;
}
.card__stats {
    grid-area: stats;
}
.card__achievements {
    grid-area: achievements;
}
</style>
