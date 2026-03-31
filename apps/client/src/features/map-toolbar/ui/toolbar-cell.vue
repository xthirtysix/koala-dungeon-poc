<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { STORAGE_KEY } from '../config/compact-toolbar.flag'
import { ToolbarCell } from '../model/toolbar-cell.type'
import { LABEL_BY_CHARACTERISTIC } from '@/entities/map'

withDefaults(
    defineProps<{
        cell: ToolbarCell
        actionsLength?: number
        actions?: boolean
    }>(),
    {
        actionsLength: 1,
        actions: false,
    },
)

const EVENT_ROW = 'mt-4 mb-2'

const isCompact = useStorage(STORAGE_KEY, false)
</script>

<template>
    <article
        class="cell text-muted w-full content-center items-center gap-x-2 rounded-lg"
        :class="{ 'cell--compact': isCompact }"
    >
        <h4
            v-if="!isCompact"
            class="cell__event font-amatic text-2xl font-bold uppercase line-clamp-1"
        >
            {{ cell.title }}
        </h4>
        <figure
            class="cell__icon font-amatic grid grid-rows-subgrid items-center justify-center rounded-full bg-(--ui-bg-elevated) p-1 text-3xl font-bold text-black uppercase"
            :class="{ 'mb-22': !cell.icon, 'mb-8': cell.icon }"
        >
            <figcaption
                :class="cell.css"
                class="flex h-10 w-10 items-center justify-center rounded-full"
            >
                {{ cell.number }}
            </figcaption>
            <img
                v-if="cell.icon"
                :src="cell.icon"
                class="color-(--ui-bg-elevated) h-8 w-8 self-center justify-self-center"
                :class="EVENT_ROW"
            />
        </figure>

        <p
            v-if="cell.throw && !isCompact"
            class="cell__info font-amatic grid text-xl font-bold uppercase"
            :class="EVENT_ROW"
        >
            <span>
                {{ LABEL_BY_CHARACTERISTIC.get(cell.throw.statKey) }}
                {{ cell.throw.check }}
            </span>
        </p>
        <slot name="action" />
    </article>
</template>

<style scoped>
.cell {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 2.825rem 1fr auto;
    grid-template-areas:
        'icon event'
        'icon info '
        'icon actions';
}

.cell--compact {
    grid-template-columns: min-content;
    grid-template-areas:
        'icon'
        'icon'
        'icon';
}

.cell::after {
    content: '';
    position: absolute;
    z-index: -1;
    display: block;
    width: 0.75rem;
    height: 1rem;
    background-color: var(--ui-bg-elevated);
    left: 1.125rem;
    top: 0.75rem;
}

.cell__icon {
    grid-area: icon;
}

.cell__event,
.cell__events {
    grid-area: event;
    justify-self: flex-start;
    flex-grow: 1;
}

.cell__icon {
    position: relative;
    grid-area: icon;
    justify-self: flex-end;
}

.cell__info {
    grid-area: info;
}

.cell__actions {
    grid-area: actions;
}
</style>
