<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Dice } from '@/shared/tools/dice'
import { useMapStore } from '@/entities/map'
import { marathonApi } from '@/entities/marathon'
import { characterApi } from '@/entities/character'
import { pathMock } from '@/widgets/path'
import { MapCanvas } from '@/widgets/map-canvas'
import { CharacterSheet } from '@/widgets/character-sheet'
import { MapPlaceholder } from '@/widgets/map-placeholder'
import { RollConfirmAction } from '@/widgets/roll-confirm'
import {
    RollsJournal,
    rollDice,
    rollDiceWithAdvantage,
    rollDiceWithDisadvantage,
    RollResult,
    useRolls,
    useDiceModal,
} from '@/features/dice'
import {
    MapToolbar,
    MapToolbarActions,
    type HandleCheckRollParams,
} from '@/features/map-toolbar'
import { MoveTokenOptions, useMapMovement } from '@/features/token'
import { DYNAMIC_STYLES } from '../consts/map.consts'
import { useStorage } from '@vueuse/core'
import { STORAGE_KEY } from '@/features/map-toolbar/config/compact-toolbar.flag'

const route = useRoute()
const diceModal = useDiceModal()
const queryClient = useQueryClient()
const mapStore = useMapStore()
const { addRollAndSave } = useRolls()
const { movementStrategy, teleport, walk } = useMapMovement({ path: pathMock })

const map = ref<InstanceType<typeof MapCanvas> | null>(null)
const mapPageContainer = ref<HTMLDivElement | null>(null)
const isMapReady = ref(false)
const isMapLocked = ref(false)
const isToolbarCompact = useStorage(STORAGE_KEY, false)

const { data: marathon, isLoading } = useQuery({
    queryKey: ['marathon'],
    queryFn: () => marathonApi.getMarathon(),
})

const rollStrategiesMap = new Map<
    RollConfirmAction,
    (dice: Dice, bonus?: number) => RollResult | void
>([
    ['forward', rollDice],
    ['backward', rollDice],
    ['roll', rollDice],
    ['advantage', rollDiceWithAdvantage],
    ['disadvantage', rollDiceWithDisadvantage],
    ['cancel', () => {}],
])

const isMapAvailable = computed(() => {
    if (route.query.map === 'enabled') {
        return true
    }

    if (!marathon.value) return false

    return (
        marathon.value?.data.isActive &&
        new Date(marathon.value?.data.startTime).getTime() < Date.now()
    )
})

function onPageClick(event: MouseEvent) {
    if (event.target instanceof SVGCircleElement) return
    mapStore.currentCell = -1
}

async function onMoveToken(index: number, { teleport }: MoveTokenOptions) {
    try {
        isMapLocked.value = true
        await movementStrategy.get(teleport)?.(index)
    } finally {
        isMapLocked.value = false
    }
}

async function onDiceRoll(result: { action: RollConfirmAction; dice?: Dice }) {
    if (!result.dice) return

    const rollResult = rollStrategiesMap.get(result.action)?.(result.dice)

    if (!rollResult) return

    try {
        await addRollAndSave(rollResult)
    } catch (error) {
        console.error('Ошибка при сохранении результата броска:', error)
    }
}

const { mutate: unlockMovement } = useMutation({
    mutationFn: () => characterApi.unlockMovement(),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['main-character'] })
    },
    onError: (error) => {
        console.error('Ошибка при разблокировке движения:', error)
    },
})

async function onCheckRoll({
    rollData,
    checkData,
    bonus,
}: HandleCheckRollParams) {
    if (!rollData.dice) return

    const rollResult = rollStrategiesMap.get(rollData.action)?.(
        rollData.dice,
        bonus,
    )

    if (!rollResult) return

    try {
        await addRollAndSave(rollResult)
        const destinationIndex = checkData.destination - 1

        const shallMove =
            mapStore.tokenCell > destinationIndex
                ? rollResult.result < checkData.check
                : rollResult.result >= checkData.check

        if (shallMove) {
            await teleport(destinationIndex)
            return
        }

        unlockMovement()
    } catch (error) {
        console.error('Ошибка при разблокировке движения:', error)
    }
}

async function onDiceSelect(dice: Dice) {
    const rollData = await diceModal.openRollConfirm(dice)

    onDiceRoll(rollData)
}

watch(isToolbarCompact, () => {
    if (!mapPageContainer.value) return

    const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === 'grid-template-columns') {
            map.value?.updateImageMetrics()
            mapPageContainer.value?.removeEventListener('transitionend', handleTransitionEnd)
        }
    }

    mapPageContainer.value.addEventListener('transitionend', handleTransitionEnd)
})
</script>

<template>
    <div
        v-if="isLoading"
        class="relative flex h-full flex-col items-start justify-start gap-3 [transition:grid-template-columns_300ms_ease] md:grid"
        :class="
            isToolbarCompact
                ? DYNAMIC_STYLES.GRID_COMPACT
                : DYNAMIC_STYLES.GRID_FULL
        "
    >
        <u-skeleton class="h-full w-full rounded-xl" />
        <u-skeleton class="h-full w-full rounded-xl" />
        <div class="grid h-full w-full gap-3 md:grid-rows-2">
            <u-skeleton class="row-span-1 w-full rounded-xl" />
            <u-skeleton class="row-span-1 w-full rounded-xl" />
        </div>
    </div>

    <map-placeholder v-else-if="!isMapAvailable" :marathon="marathon" />

    <div
        ref="mapPageContainer"
        v-else
        :class="
            isToolbarCompact
                ? DYNAMIC_STYLES.GRID_COMPACT
                : DYNAMIC_STYLES.GRID_FULL
        "
        class="relative flex h-full flex-col items-start justify-start gap-3 [transition:grid-template-columns_300ms_ease] md:grid"
    >
        <map-toolbar
            class="overflow-hidden"
            @token-cell-click="map?.focusToken"
            @roll-dice="onDiceRoll"
            @check-dice="onCheckRoll"
            @move-token="onMoveToken"
        >
            <template #actions>
                <map-toolbar-actions
                    @find-token="map?.focusToken"
                    @roll-dice="onDiceSelect"
                />
            </template>
        </map-toolbar>

        <div class="relative container h-[600px] w-full md:h-full">
            <div class="h-full overflow-auto rounded-xl">
                <map-canvas
                    ref="map"
                    @click.capture="onPageClick"
                    @map-ready="isMapReady = true"
                />
            </div>
        </div>

        <div
            class="@container/char grid h-full w-full grid-rows-[max-content_1fr] gap-3 sm:max-h-[calc(100vh-7.1rem)]"
        >
            <u-card
                :ui="{
                    root: 'rounded-xl',
                    body: 'p-2 sm:p-2',
                }"
            >
                <character-sheet @token-click="map?.focusToken()" />
            </u-card>
            <u-card
                :ui="{
                    root: 'rounded-xl overflow-y-auto h-[300px] md:h-full',
                    body: 'p-2 sm:p-2',
                }"
            >
                <rolls-journal @move-button-click="walk($event)" />
            </u-card>
        </div>
    </div>
</template>
