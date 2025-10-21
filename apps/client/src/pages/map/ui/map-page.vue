<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMapStore } from '@/entities/map'
import { Cell } from '@/entities/cell'
import { MapCanvas } from '@/widgets/map-canvas'
import { CellInfo } from '@/widgets/cell-info'
import { CellMarks } from '@/widgets/cell-marks'
import { FastDice } from '@/widgets/fast-dice'
import { useUserStore } from '@/entities/user'
import { CharacterSheet } from '@/widgets/character-sheet'
import { RollConfirmAction } from '@/widgets/roll-confirm'
import { Dice } from '@/entities/dice'
import {
    RollsJournal,
    rollDice,
    rollDiceWithAdvantage,
    rollDiceWithDisadvantage,
    RollResult,
    useRolls,
} from '@/features/dice'
import { PlaceTokenButton } from '@/features/place-token'
import { useMarathon } from '@/entities/marathon'
import { MapPlaceholder } from '@/widgets/map-placeholder'

const route = useRoute()
const mapStore = useMapStore()
const userStore = useUserStore()
const { addRollAndSave } = useRolls()
const { marathon, isLoading: marathonLoading } = useMarathon()
const map = ref<InstanceType<typeof MapCanvas> | null>(null)
const showCellInfo = ref(false)
const isMapReady = ref(false)

onMounted(async () => {
    await mapStore.loadCustomMarksFromServer()
})

const rollStrategiesMap = new Map<
    RollConfirmAction,
    (dice: Dice) => RollResult | void
>([
    ['forward', rollDice],
    ['backward', rollDice],
    ['roll', rollDice],
    ['advantage', rollDiceWithAdvantage],
    ['disadvantage', rollDiceWithDisadvantage],
    ['cancel', () => {}],
])

const currentCell = computed<Cell>(
    () => mapStore.enrichedCells[mapStore.currentCell],
)

const isMapAvailable = computed(() => {
    if (route.query.map === 'enabled') {
        return true
    }

    if (!marathon.value) return false

    return (
        marathon.value?.isActive &&
        new Date(marathon.value?.startTime).getTime() < Date.now()
    )
})

function handlePageClick(event: MouseEvent) {
    if (event.target instanceof SVGCircleElement) return
    showCellInfo.value = false
}

function handleMapClick() {
    showCellInfo.value = true
}

async function handleRoll(result: { action: RollConfirmAction; dice?: Dice }) {
    if (!result.dice) return

    const rollResult = rollStrategiesMap.get(result.action)?.(result.dice)

    if (!rollResult) return

    try {
        await addRollAndSave(rollResult)
    } catch (error) {
        console.error('Ошибка при сохранении результата броска:', error)
    }
}
</script>

<template>
    <div
        v-if="marathonLoading"
        class="relative flex h-full flex-col items-start justify-start gap-4 md:grid md:grid-cols-[2fr_1fr]"
    >
        <u-skeleton class="h-full w-full rounded-3xl" />
        <div class="grid h-full w-full gap-4 md:grid-rows-[606px_auto]">
            <u-skeleton class="row-span-1 w-full rounded-3xl" />
            <u-skeleton class="row-span-1 w-full rounded-3xl" />
        </div>
    </div>

    <map-placeholder v-else-if="!isMapAvailable" :marathon="marathon" />

    <div
        v-else
        class="relative flex flex-col h-full items-start justify-start gap-4 md:grid md:grid-cols-[2fr_1fr]"
    >
        <div class="relative container h-[600px] md:h-full w-full">
            <div class="h-full overflow-auto rounded-3xl rounded-b-[2.5rem]">
                <map-canvas
                    ref="map"
                    @cell-click="handleMapClick"
                    @click.capture="handlePageClick"
                    @map-ready="isMapReady = true"
                />
                <transition name="fade-scale" appear mode="out-in">
                    <cell-info
                        v-if="showCellInfo"
                        :events="
                            currentCell.events?.length
                                ? currentCell.events
                                : [{ type: null }]
                        "
                        :cell-number="mapStore.currentCell"
                        class="absolute top-auto bottom-2 left-2 z-100"
                        @click.stop
                    >
                        <template #default="{ cellNumber }">
                            <place-token-button
                                class="z-1"
                                @click="map?.moveTokenTo(cellNumber)"
                            />
                            <cell-marks :cell-number="cellNumber" />
                        </template>
                    </cell-info>
                </transition>
            </div>
            <fast-dice
                v-if="userStore.user && isMapReady"
                class="absolute right-2 bottom-2 z-100"
                @roll="handleRoll"
            />
        </div>
        <div
            class="@container/char grid h-full w-full grid-rows-[max-content_1fr] gap-4 sm:max-h-[calc(100vh-8.5rem)]"
        >
            <character-sheet @token-click="map?.focusToken()" />
            <u-card
                :ui="{
                    root: 'col-span-full rounded-3xl overflow-y-auto h-[300px] md:h-full',
                    body: 'p-2 sm:p-2 overflow-y-auto',
                }"
            >
                <rolls-journal @move-button-click="map?.moveTokenTo($event)" />
            </u-card>
        </div>
    </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
    @apply transition-all duration-300;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
    @apply scale-90 opacity-0;
}
.fade-scale-enter-to,
.fade-scale-leave-from {
    @apply opacity-100;
}
</style>
