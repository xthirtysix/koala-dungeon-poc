<script setup lang="ts">
import { ArtefactKey } from '@/entities/artefact'
import { ICON_BY_PROPERTY } from '../consts/icon-by-property.const'

defineProps<{
    property: ArtefactKey
}>()
</script>

<template>
    <div class="stat-badge flex items-center justify-items-center gap-1 p-0">
        <img
            :src="ICON_BY_PROPERTY.get(property)"
            class="h-6 w-6 lg:h-7 lg:w-7"
        />
        <slot />
    </div>
</template>
