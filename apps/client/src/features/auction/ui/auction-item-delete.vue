<script setup lang="ts">
import { useAuctionItem } from '../model/auction-item.composable'
import type {
    Auction,
    AuctionItem,
} from '@/entities/auction/model/auction.types'
import type { Persisted } from '@/shared/model/persisted.type'

defineProps<{
    itemId: AuctionItem['id']
    auctionId: Persisted<Auction>['documentId']
}>()

const { remove } = useAuctionItem()
</script>

<template>
    <u-button
        icon="i-material-symbols:close"
        @click="remove({ itemId, auctionId })"
    />
</template>
