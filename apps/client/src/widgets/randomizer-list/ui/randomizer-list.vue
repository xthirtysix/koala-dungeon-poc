<script setup lang="ts">
import { Auction } from '@/entities/auction'
import type { AuctionItem } from '@/entities/auction/model/auction.types'
import { AuctionItemDelete, AuctionItemAdd } from '@/features/auction'
import { Persisted } from '@/shared/model/persisted.type'

defineProps<{
    items: AuctionItem[]
    auctionId: Persisted<Auction>['documentId']
}>()
</script>

<template>
    <section>
        <auction-item-add :auction-id="auctionId" />

        <transition-group
            tag="ul"
            name="list"
            v-if="items"
            class="relative mt-4 max-h-[22.5rem] overflow-y-scroll p-1"
        >
            <li
                v-for="item in items"
                :key="item.id"
                class="bg-default flex w-full items-center justify-between rounded px-2 py-1 not-last:mb-2"
            >
                <span
                    class="font-amatic text-2xl font-bold text-white text-shadow-md"
                >
                    {{ item.title }}
                </span>
                <auction-item-delete
                    :item-id="item.id"
                    :auction-id="auctionId"
                    size="sm"
                    variant="link"
                    class="text-white"
                />
            </li>
        </transition-group>
    </section>
</template>

<style scoped>
.list-move,
.list-enter-active {
    transition:
        transform 0.5s ease,
        opacity 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.list-leave-active {
    position: absolute;
    right: 0;
    transition:
        transform 0.5s ease,
        opacity 0.5s ease;
}

.list-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
