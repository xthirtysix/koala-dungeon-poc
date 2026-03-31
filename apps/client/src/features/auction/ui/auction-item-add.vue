<script setup lang="ts">
import { ref } from 'vue'
import { useAuctionItem } from '../model/auction-item.composable'
import { Persisted } from '@/shared/model/persisted.type'
import { Auction } from '@/entities/auction'

const props = defineProps<{ auctionId: Persisted<Auction>['documentId'] }>()

const { create, isCreating } = useAuctionItem()

const newItem = ref('')

function createItem() {
    create({
        auctionItem: { title: newItem.value, amount: 0 },
        auctionId: props.auctionId,
    })
    newItem.value = ''
}
</script>

<template>
    <u-input
        :loading="isCreating"
        loading-icon="i-lucide-loader"
        v-model="newItem"
        :ui="{ root: 'w-full px-1', base: 'pe-18', trailing: 'pr-0.3' }"
    >
        <template v-if="newItem.trim().length" #trailing>
            <u-button
                icon="i-material-symbols:add"
                size="sm"
                variant="link"
                @click="createItem"
            />
        </template>
    </u-input>
</template>
