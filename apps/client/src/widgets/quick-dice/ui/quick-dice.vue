<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dice } from '@/shared/tools/dice'
import { actions } from '@/widgets/quick-dice'
import { RollConfirmAction } from '@/widgets/roll-confirm'
import { STORAGE_KEY } from '@/features/map-toolbar/config/compact-toolbar.flag'
import { useStorage } from '@vueuse/core'
// import { DicePool } from '@/widgets/dice-pool'

const emit = defineEmits<{
    (e: 'roll', result: { action: RollConfirmAction; dice?: Dice }): void
    (e: 'settings'): void
    (e: 'toggle'): void
    (e: 'close'): void
    (e: 'open-drawer'): void
    (e: 'close-drawer'): void
    (e: 'open-roll-confirm', dice: Dice): void
}>()

const props = defineProps<{
    icon?: string
    label?: string
    isDrawerOpen?: boolean
}>()

const isCompact = useStorage(STORAGE_KEY, false)

const isOpen = ref(false)
const isDrawerOpenLocal = ref(false)

watch(
    () => props.isDrawerOpen,
    (newValue) => {
        if (newValue !== undefined) {
            isDrawerOpenLocal.value = newValue
        }
    },
    { immediate: true },
)

function toggle() {
    isOpen.value = !isOpen.value
}

function close() {
    isOpen.value = false
}

function handleDiceClick(dice: Dice) {
    emit('close')
    emit('open-roll-confirm', dice)
    close()
}

// function handleSettingsClick() {
//     isDrawerOpenLocal.value = true
//     emit('open-drawer')
// }

// function handleDrawerClose() {
//     isDrawerOpenLocal.value = false
//     emit('close-drawer')
// }
</script>

<template>
    <u-button
        :ui="{
            base: 'w-full cursor-pointer rounded-lg z-30 relative px-2',
            label: 'w-full text-left',
            leadingIcon: 'w-6 h-6 text-gray-500 dark:text-gray-400',
        }"
        icon="i-ph:dice-six"
        variant="soft"
        color="neutral"
        :label="isCompact ? '' : isOpen ? 'Cкрыть' : 'Бросить кости'"
        @click="toggle"
    />
    <transition-group
        name="slide"
        tag="ul"
        class="absolute inset-0 top-0 z-20 flex flex-col justify-end rounded-2xl pb-12 align-bottom transition-colors duration-300"
        :class="isOpen ? 'bg-default' : 'pointer-events-none bg-transparent'"
        dial
    >
        <template v-if="isOpen">
            <li
                v-for="(action, idx) in actions"
                :key="action.label"
                class="flex w-auto rounded p-1.5"
                :style="{
                    transitionDelay: (actions.length - 1 - idx) * 50 + 'ms',
                }"
            >
                <u-button
                    :icon="action.icon"
                    :label="isCompact ? '' : action.label"
                    variant="soft"
                    color="neutral"
                    size="xl"
                    :ui="{
                        base: `z-1 ${isCompact ? 'w-[48px]' : 'min-w-[4.5rem]'} rounded-lg py-[0.375rem] pl-2 pr-3  hover:cursor-pointer`,
                        leadingIcon: 'w-6 h-6 text-gray-500 dark:text-gray-400',
                        label: 'text-current',
                    }"
                    @click="handleDiceClick(action.dice)"
                />
            </li>
            <!-- <li class="flex w-auto justify-start rounded-3xl p-2">
                <u-button
                    icon="i-game-icons:cog"
                    label="Настроить"
                    variant="soft"
                    color="neutral"
                    size="xl"
                    :ui="{
                        base: 'z-1 rounded-lg py-1 pl-2 pr-3 hover:cursor-pointer ',
                        leadingIcon: 'w-6 h-6 text-gray-500 dark:text-gray-400',
                    }"
                    @click="handleSettingsClick"
                />
            </li> -->
        </template>
    </transition-group>

    <!-- <u-drawer
        v-model="isDrawerOpenLocal"
        title="Настройка броска"
        direction="right"
        :handle="false"
        :ui="{
            title: 'text-3xl font-bold font-amatic',
        }"
    >
        <template #body>
            <dice-pool @close="handleDrawerClose" />
        </template>
    </u-drawer> -->
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition:
        transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}
.slide-enter-to {
    opacity: 1;
    transform: translateY(0);
}
.slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}
.slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
