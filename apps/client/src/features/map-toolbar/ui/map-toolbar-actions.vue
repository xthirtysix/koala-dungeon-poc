<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { useUserStore } from '@/entities/user'
import { QuickDice } from '@/widgets/quick-dice'
import { useDiceModal } from '@/features/dice'
import { Dice } from '@/shared/tools/dice'
import MapToolbarToggler from './map-toolbar-toggler.vue'
import { STORAGE_KEY } from '../config/compact-toolbar.flag'

const userStore = useUserStore()
const diceModal = useDiceModal()
const isCompact = useStorage(STORAGE_KEY, false)

const emit = defineEmits<{
    (e: 'find-token'): void
    (e: 'roll-dice', dice: Dice): void
    (e: 'toggle'): void
}>()
</script>

<template>
    <ul class="grid gap-2.5">
        <li>
            <map-toolbar-toggler />
        </li>
        <li>
            <u-button
                :ui="{
                    base: 'w-full cursor-pointer rounded-lg px-2',
                    label: 'w-full text-left',
                    leadingIcon: `${isCompact ? 'mx-auto' : ''} w-6 h-6 text-gray-500 dark:text-gray-400`,
                }"
                icon="i-ph:map-pin"
                variant="soft"
                color="neutral"
                :label="isCompact ? '' : 'Найти токен'"
                @click="emit('find-token')"
            />
        </li>
        <li>
            <quick-dice
                v-if="userStore.user"
                @open-roll-confirm="emit('roll-dice', $event)"
                @toggle="diceModal.toggle()"
                @close="diceModal.close()"
                @open-drawer="diceModal.openDrawer()"
                @close-drawer="diceModal.closeDrawer()"
            />
        </li>
    </ul>
</template>
