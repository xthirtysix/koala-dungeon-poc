<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    ui?: { root?: string; header?: string; body?: string; footer?: string }
}>()

const classes = computed(() => {
    return {
        root: ['divide-none', props.ui?.root].join(' '),
        body: ['p-0', props.ui?.body].join(' '),
        footer: ['p-0', props.ui?.footer].join(' '),
        header: ['p-0', props.ui?.header].join(' '),
    }
})
</script>

<template>
    <u-card class="kd-card" :ui="classes">
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </u-card>
</template>
