<script setup lang="ts">
import type { Persisted } from '@/shared/model/persisted.type'
import type { Auction } from '@/entities/auction'

defineProps<{ auctionId: Persisted<Auction>['documentId'] }>()
</script>

<template>
    <u-button>Завершить</u-button>
</template>
