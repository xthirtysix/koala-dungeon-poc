<script setup lang="ts">
import { useAuction } from '../model/auction.composable'

const { create, createStatus } = useAuction()
</script>

<template>
    <article
        class="auction-add ring-default bg-default flex h-full items-center justify-center rounded-lg ring-1"
        :class="
            createStatus === 'loading' ? 'cursor-progress' : 'cursor-pointer'
        "
        @click="create"
    >
        <h3 class="sr-only">Создать аукцион</h3>
        <u-icon name="i-material-symbols:add" class="size-8" />
    </article>
</template>
