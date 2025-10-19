<script setup lang="ts">
import { ref } from 'vue'
import { Dice } from '@/entities/dice'
import { actions } from '@/widgets/fast-dice'
import { RollConfirm, RollConfirmAction } from '@/widgets/roll-confirm'
import { DicePool } from '@/widgets/dice-pool'

const emit = defineEmits<{
    (e: 'roll', result: { action: RollConfirmAction; dice?: Dice }): void
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

    if (!result.dice) return

    emit('roll', result)
}
</script>

<template>
    <div class="flex min-h-16 min-w-16 items-center gap-2 rounded-full p-2">
        <u-button
            icon="i-game-icons:rolling-dices"
            variant="solid"
            color="secondary"
            size="xl"
            @click="toggle"
            :aria-label="label || 'Открыть меню'"
            :ui="{
                base: 'z-50 h-14 w-14 rounded-full border-1 border-white bg-stone-200 text-slate-800 shadow-lg/30 shadow-black transition-transform hover:cursor-pointer hover:bg-stone-200/50 active:bg-stone-200/50 dark:shadow-violet-400',
                label: 'text-4xl border-0',
                leadingIcon: 'w-10 h-10',
            }"
        />
        <transition-group
            name="slide"
            tag="ul"
            class="absolute right-0 bottom-20 z-20 flex flex-col items-end gap-3"
            dial
        >
            <template v-if="isOpen">
                <li
                    v-for="(action, idx) in actions"
                    :key="action.label"
                    class="flex w-auto justify-end rounded-3xl p-2"
                    :style="{
                        transitionDelay: (actions.length - 1 - idx) * 50 + 'ms',
                    }"
                >
                    <u-button
                        :icon="action.icon"
                        :label="action.label"
                        variant="subtle"
                        size="xl"
                        :ui="{
                            base: 'z-1 min-w-[4.5rem] justify-between rounded-3xl border-white bg-stone-200 py-1 pl-2 pr-3 text-slate-800 ring-white hover:cursor-pointer hover:bg-stone-200/50 active:bg-stone-200',
                            leadingIcon: 'w-6 h-6',
                            label: 'text-current',
                        }"
                        @click="handleDiceClick(action.dice)"
                    />
                </li>
                <li class="flex w-auto justify-end rounded-3xl p-2">
                    <u-button
                        icon="i-game-icons:cog"
                        label="Настроить"
                        variant="subtle"
                        size="xl"
                        :ui="{
                            base: 'z-1 rounded-3xl bg-stone-200 py-1 pl-2 pr-3 text-slate-800 ring-0 ring-white hover:cursor-pointer hover:bg-stone-200/50 active:bg-stone-200/50',
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
