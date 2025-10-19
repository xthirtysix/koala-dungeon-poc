<script setup lang="ts">
import { computed } from 'vue'
import { getCellColorByEvent, type CellEvent } from '@/entities/cell'
import { useCellInfo, type CellEventInfo } from '@/widgets/cell-info'

const props = defineProps<{ events?: CellEvent[]; cellNumber?: number }>()

const { getInfo } = useCellInfo()

const info = computed<CellEventInfo[]>(() =>
    props.events?.length
        ? props.events.map((event) => getInfo(event))
        : [getInfo({ type: null })],
)
</script>

<template>
    <article
        v-if="cellNumber !== undefined"
        class="liquid-glass flex min-h-16 min-w-16 items-center gap-2 rounded-full p-2"
    >
        <h4
            v-if="cellNumber !== undefined"
            class="font-amatic relative z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white bg-stone-200 text-4xl font-bold text-gray-900 drop-shadow"
        >
            {{ cellNumber + 1 }}
        </h4>
        <ul class="flex gap-2">
            <li
                v-for="(event, index) in events ?? [{ type: null }]"
                :key="index"
                class="relative flex min-h-[3.5rem] min-w-0 items-center gap-2 overflow-hidden rounded-full px-5 py-1 drop-shadow"
                :style="{ background: getCellColorByEvent([event]) }"
            >
                <div
                    class="kd-gradient pointer-events-none absolute top-0 left-0 h-4 w-full rounded-full"
                />
                <span
                    v-if="info[index]?.icon"
                    class="relative z-10 text-3xl font-bold drop-shadow"
                >
                    {{ info[index].icon }}
                </span>
                <div class="relative z-10 grid font-sans">
                    <h5 class="kd-h5 text-base font-bold text-gray-900">
                        {{ info[index].title }}
                    </h5>
                    <span
                        v-if="info[index].subtitle"
                        class="text-sm font-normal text-gray-900 opacity-80"
                    >
                        {{ info[index].subtitle }}
                    </span>
                </div>
            </li>
        </ul>

        <slot :cell-number="cellNumber"/>
        <svg style="display: none">
            <filter id="displacementFilter">
                <feTurbulence
                    type="turbulence"
                    baseFrequency="0.01"
                    numOctaves="0"
                    result="turbulence"
                />

                <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="250"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
        </svg>
    </article>
</template>

<style>
.liquid-glass {
    transition: opacity 0.26s ease-out;
    filter: drop-shadow(-8px -10px 46px #0000005f);
    backdrop-filter: brightness(1.1) blur(2px) url(#displacementFilter);
}

.liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: 9999px;
    box-shadow:
        inset 3px 3px 0px -3px rgba(255, 255, 255, 0.7),
        inset 0 0 8px 1px rgba(255, 255, 255, 0.7);
}
</style>
