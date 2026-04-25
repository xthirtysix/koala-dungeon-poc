<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
    inheritAttrs: false,
})

type CardUi = {
    root?: string
    body?: string
    header?: string
}

const props = withDefaults(
    defineProps<{
        background?: string
    }>(),
    {
        background: 'bg-muted/50',
    },
)

const attrs = useAttrs()

const cardUi = computed<CardUi>(() => {
    const incomingUi = (attrs.ui ?? {}) as CardUi

    return {
        root: `rounded-xl p-2 ring-0 shadow-sm shadow-black/10 dark:shadow-primary/30 ${props.background} ${incomingUi.root ?? ''}`,
        body: `p-0 sm:p-0 h-auto relative overflow-hidden rounded-lg flex items-center justify-center ${incomingUi.body ?? ''}`,
        header: `text-center font-bold truncate w-full font-size-md p-0 sm:p-0 mb-2 border-none font-inter ${incomingUi.header ?? ''}`,
    }
})

const forwardedAttrs = computed(() => {
    const { ui: _ui, ...rest } = attrs
    return rest
})
</script>

<template>
    <u-card v-bind="forwardedAttrs" :ui="cardUi">
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </u-card>
</template>
