<script setup lang="ts">
import { ref } from 'vue'
import { Dice } from '@/entities/dice'
import { actions } from '@/widgets/fast-dice'
import { RollConfirm } from '@/widgets/roll-confirm'
import { DicePool } from '@/widgets/dice-pool'

const emit = defineEmits<{
    (e: 'roll', dice: Dice): void
    (e: 'settings'): void
}>()

defineProps<{
    icon?: string
    label?: string
}>()

const isOpen = ref(false)
const selectedDice = ref<Dice | null>(null)

const overlay = useOverlay()
const rollConfirmModal = overlay.create(RollConfirm)

const isDrawerOpen = ref(false)

function toggle() {
    isOpen.value = !isOpen.value
}

function close() {
    isOpen.value = false
}

function handleDiceClick(dice: Dice) {
    selectedDice.value = dice
    close()
    openRollConfirm(dice)
}

function handleSettingsClick() {
    isOpen.value = false
    isDrawerOpen.value = true
}

async function openRollConfirm(dice: Dice) {
    const instance = rollConfirmModal.open({
        dice,
        title: 'Бросить кости',
        description: 'Выберите кость для броска',
    })
    const result = await instance.result
    if (result === 'roll') {
        emit('roll', dice)
    }
}
</script>

<template>
    <div class="inline-block">
        <u-button
            icon="i-game-icons:rolling-dices"
            variant="solid"
            color="primary"
            size="xl"
            @click="toggle"
            :aria-label="label || 'Открыть меню'"
            :ui="{
                base: 'rounded-full shadow-black dark:shadow-violet-400 shadow-lg/30 w-14 h-14 transition-transform hover:scale-110',
                label: 'text-4xl',
                leadingIcon: 'w-10 h-10',
            }"
        />
        <transition-group
            name="slide"
            tag="ul"
            class="absolute right-0 bottom-16 z-20 flex flex-col gap-3"
            dial
        >
            <template v-if="isOpen">
                <li
                    v-for="(action, idx) in actions"
                    :key="action.label"
                    class="flex justify-end"
                    :style="{
                        transitionDelay: (actions.length - 1 - idx) * 50 + 'ms',
                    }"
                >
                    <u-button
                        :icon="action.icon"
                        :label="action.label"
                        variant="subtle"
                        color="primary"
                        size="xl"
                        :ui="{
                            leadingIcon: 'w-6 h-6',
                        }"
                        @click="handleDiceClick(action.dice)"
                    />
                </li>
                <li>
                    <u-button
                        icon="i-game-icons:cog"
                        label="Настроить"
                        variant="subtle"
                        color="primary"
                        size="xl"
                        :ui="{
                            leadingIcon: 'w-6 h-6',
                        }"
                        @click="handleSettingsClick"
                    />
                </li>
            </template>
        </transition-group>

        <u-drawer
            v-model:open="isDrawerOpen"
            title="Настройка броска"
            direction="right"
            :handle="false"
            :ui="{
                title: 'text-3xl font-bold font-amatic',
            }"
        >
            <template #body>
                <dice-pool @close="isDrawerOpen = false" />
            </template>
        </u-drawer>
    </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition:
        transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
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
