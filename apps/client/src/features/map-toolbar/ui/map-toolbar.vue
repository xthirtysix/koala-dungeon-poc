<script setup lang="ts">
import { ref } from 'vue'
import { Dice } from '@/shared/tools/dice'
import { useUserStore } from '@/entities/user'
import { useCharacter } from '@/entities/character'
import { RollConfirmAction } from '@/widgets/roll-confirm'
import { useDiceModal } from '@/features/dice'
import type { MoveTokenOptions } from '@/features/token'
import { ToolbarCell } from '../index'
import { useMapToolbar } from '../model/map-toolbar.composable'
import { HandleCheckRollParams } from '../model/handle-check-roll.type'
import { STORAGE_KEY } from '../config/compact-toolbar.flag'
import { useStorage } from '@vueuse/core'

const emit = defineEmits<{
    (e: 'toggle-toolbar'): void
    (e: 'token-cell-click'): void
    (e: 'find-token'): void
    (e: 'roll-dice', result: { action: RollConfirmAction; dice?: Dice }): void
    (e: 'check-dice', params: HandleCheckRollParams): void
    (e: 'move-token', cellNumber: number, { teleport }: MoveTokenOptions): void
}>()

const { tokenCell, selectedCell, toolbarStyle } = useMapToolbar()
const { data: character } = useCharacter()
const userStore = useUserStore()
const diceModal = useDiceModal()
const isCompact = useStorage(STORAGE_KEY, false)

const isPathVisible = ref(!!selectedCell.value)

function onCurrentPositionClick() {
    emit('token-cell-click')
}

async function onCheckClick() {
    if (!tokenCell.value.throw?.check) return

    const rollData = await diceModal.openRollConfirm(Dice.D20, {
        statCheck: tokenCell.value.throw?.statKey,
    })

    emit('check-dice', {
        rollData,
        checkData: tokenCell.value.throw,
        bonus: rollData.bonus,
    })
}

function onBeforeEnter() {
    isPathVisible.value = true
}

function onBeforeLeave() {
    isPathVisible.value = false
}
</script>

<template>
    <div
        class="ring-default bg-default relative container flex h-full w-full flex-col rounded-xl p-2 ring-1 transition-colors duration-500 ease-in-out"
        :class="toolbarStyle"
    >
        <transition-group
            name="fade"
            @before-enter="onBeforeEnter"
            @before-leave="onBeforeLeave"
        >
            <toolbar-cell
                v-if="tokenCell.number"
                :cell="tokenCell"
                actions
                class="cell mb-20"
                :class="{
                    'cell--path': isPathVisible,
                    'cell--blocked': character?.is_movement_locked,
                }"
                @cell-click="onCurrentPositionClick"
            >
                <template v-if="character?.is_movement_locked" #action>
                    <div
                        class="cell__blocker col-span-full grid h-[4.5rem] grid-cols-subgrid items-start"
                    >
                        <u-icon
                            :name="
                                userStore.user
                                    ? 'i-material-symbols:close'
                                    : 'fluent:hourglass-three-quarter-20-regular'
                            "
                            class="bg-default color-(--ui-bg-elevated) h-8 w-8 self-start justify-self-center rounded-full p-1 ring-3 ring-(--ui-bg-elevated) transition"
                            :class="{
                                'cursor-pointer hover:scale-[1.2]': isCompact,
                            }"
                            @click="onCheckClick"
                        />
                        <template v-if="!isCompact">
                            <u-button
                                v-if="userStore.user"
                                variant="soft"
                                color="neutral"
                                label="Проверка"
                                class="w-full"
                                @click="onCheckClick"
                            />
                            <span
                                v-else
                                class="font-amatic text-muted text-xl font-bold uppercase"
                            >
                                Ожидает проверки
                            </span>
                        </template>
                    </div>
                </template>
                <template
                    v-else-if="
                        userStore.user &&
                        selectedCell.number &&
                        selectedCell.number !== tokenCell.number
                    "
                    #action
                >
                    <div
                        class="cell__blocker col-span-full grid h-[4.5rem] grid-cols-subgrid items-start gap-2"
                    >
                        <template
                            v-if="
                                Math.abs(
                                    selectedCell.number - tokenCell.number,
                                ) < 20
                            "
                        >
                            <u-icon
                                name="i-fluent-emoji-high-contrast:paw-prints"
                                class="bg-default color-(--ui-bg-elevated) h-8 w-8 self-start justify-self-center rounded-full p-1 ring-3 ring-(--ui-bg-elevated) transition"
                                :class="{
                                    'cursor-pointer hover:scale-[1.2]':
                                        isCompact,
                                }"
                                @click="
                                    emit(
                                        'move-token',
                                        selectedCell.number - 1,
                                        { teleport: false },
                                    )
                                "
                            />
                            <u-button
                                v-if="!isCompact"
                                variant="soft"
                                color="neutral"
                                label="Перейти"
                                class="w-full"
                                @click="
                                    emit(
                                        'move-token',
                                        selectedCell.number - 1,
                                        { teleport: false },
                                    )
                                "
                            />
                        </template>
                        <u-icon
                            name="i-game-icons:portal"
                            class="bg-default color-(--ui-bg-elevated) h-8 w-8 self-start justify-self-center rounded-full p-1 ring-3 ring-(--ui-bg-elevated) transition"
                            :class="{
                                'cursor-pointer hover:scale-[1.2]': isCompact,
                            }"
                            @click="
                                emit('move-token', selectedCell.number - 1, {
                                    teleport: true,
                                })
                            "
                        />
                        <u-button
                            v-if="!isCompact"
                            variant="soft"
                            color="neutral"
                            label="Телепорт"
                            class="w-full"
                            @click="
                                emit('move-token', selectedCell.number - 1, {
                                    teleport: true,
                                })
                            "
                        />
                    </div>
                </template>
                <template v-else #action>
                    <div class="col-span-full h-[4.5rem] grid-cols-subgrid" />
                </template>
            </toolbar-cell>

            <toolbar-cell
                v-if="
                    selectedCell.number &&
                    selectedCell.number !== tokenCell.number
                "
                :cell="selectedCell"
                :actions-length="3"
                :actions="!tokenCell.throw"
                class="cell"
                @cell-click="onCurrentPositionClick"
            />
        </transition-group>

        <div class="mt-auto">
            <slot name="actions" />
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.cell {
    position: relative;
    z-index: 1;
}

.cell::after {
    transition: height 0.5s;
}

.cell--path::after {
    content: '';
    position: absolute;
    z-index: -1;
    display: block;
    width: 0.75rem;
    height: 0;
    background-color: var(--ui-bg-elevated);
    left: 1.125rem;
    top: 1rem;
}

.cell--blocked::after {
    min-height: 70%;
    height: 70%;
}

.cell--path:not(:last-of-type)::after {
    height: calc(100% + 5rem);
}
</style>
