<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Auction } from '../model/auction.types'
import type { Persisted } from '@/shared/model/persisted.type'

const props = defineProps<{
    item: Persisted<Auction>
}>()

const router = useRouter()

const stateColor = computed(() => {
    return props.item.is_closed
        ? {
              foreground: 'text-red-500',
              background: 'bg-red-500',
          }
        : {
              foreground: 'text-green-500',
              background: 'bg-green-500',
          }
})

function onCardClick() {
    router.push({ path: `/auctions/${props.item.documentId}` })
}
</script>

<template>
    <u-card
        :ui="{
            root: 'p-2 sm:p-2 h-full cursor-pointer',
            body: 'font-amatic font-bold h-full grid grid-cols-[1rem_1fr] items-center',
        }"
        class="auction-card"
        @click.capture.once="onCardClick"
    >
        <h3 class="col-span-full truncate text-2xl" :title="item.title">
            {{ item.title }}
        </h3>
        <time
            v-if="item.createdAt"
            :datetime="item.createdAt"
            class="col-span-full block text-lg"
        >
            {{ new Date(item.createdAt).toLocaleDateString('ru-RU') }}
        </time>
        <div
            class="auction-card__activity-dot mt-1 inline-flex h-3 w-3 rounded-full"
            :class="stateColor.background"
        />
        <span
            class="auction-card__activity-label mt-auto text-lg uppercase"
            :class="stateColor.foreground"
        >
            {{ item.is_closed ? 'Завершен' : 'Активен' }}
        </span>
    </u-card>
</template>
