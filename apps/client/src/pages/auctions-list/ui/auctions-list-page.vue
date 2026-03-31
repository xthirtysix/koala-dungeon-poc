<script setup lang="ts">
import { auctionApi, AuctionCard, AUCTION_QUERY_KEY } from '@/entities/auction'
import { AuctionAdd } from '@/features/auction'
import { useQuery } from '@pinia/colada'

const { data } = useQuery({
    key: [AUCTION_QUERY_KEY],
    query: () => auctionApi.fetchAuctions(),
})
</script>

<template>
    <h1 class="kd-h1">Аукционы</h1>

    <ul class="grid grid-cols-3 gap-4">
        <li>
            <auction-add class="min-h-[10rem]" />
        </li>

        <template v-if="data?.auctions.length">
            <li v-for="item of data.auctions" :key="item.id">
                <auction-card :item="item" class="min-h-[10rem]" />
            </li>
        </template>
    </ul>
</template>
