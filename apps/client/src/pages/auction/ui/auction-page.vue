<script setup lang="ts">
import { computed, nextTick, ref, shallowRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { AUCTION_QUERY_KEY, auctionApi } from '@/entities/auction'

const route = useRoute()

const slotDrumRef = shallowRef<ComponentExposed<typeof SlotDrum>>()

const { data: auction, status } = useQuery({
    queryKey: [AUCTION_QUERY_KEY, route.params.id],
    queryFn: () => {
        return auctionApi.getAuction(route.params.id as string)
    },
})

const buttonLabel = computed(() => {
    switch (slotDrumRef.value?.status) {
        case 'spinning':
            return 'Остановить'
        case 'idle':
            return 'Вращать'
        default:
            return 'Ожидаем результат'
    }
})

const buttonIcon = computed(() => {
    switch (slotDrumRef.value?.status) {
        case 'spinning':
            return 'i-svg-spinners:wind-toy'
        case 'idle':
            return 'i-ph:spinner-ball'
        default:
            return 'i-svg-spinners:clock'
    }
})
</script>

<template>
    <template v-if="status === 'pending'"> Loading </template>
    <template v-else-if="status === 'error'"> Error </template>
    <template v-else-if="auction">
        <h1 class="kd-h1 inline-flex">
            {{ auction.owner.username }}
        </h1>

        <div
            v-if="auction.items"
            class="grid min-h-[66vh] grid-cols-[max-content_1fr_1fr] content-center items-center gap-4"
        >
            <slot-drum ref="slotDrumRef" :items="auction.items" />

            <div class="grid gap-4">
                <u-button
                    :disabled="slotDrumRef?.status === 'slowdown'"
                    :icon="buttonIcon"
                    :variant="
                        slotDrumRef?.status === 'slowdown' ? 'ghost' : 'solid'
                    "
                    @click="
                        slotDrumRef?.status === 'spinning'
                            ? slotDrumRef?.stop()
                            : slotDrumRef?.spin()
                    "
                >
                    {{ buttonLabel }}
                </u-button>
                <auction-close
                    :auction-id="auction.documentId"
                    color="error"
                    icon="i-material-symbols:cancel-outline"
                />
            </div>

            <randomizer-list
                :items="auction.items"
                :auction-id="auction.documentId"
                class="ml-auto min-w-[380px] self-start"
            />
        </div>
    </template>
</template>
