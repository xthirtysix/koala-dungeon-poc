<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRolls, RollsCard } from '@/features/dice'
// import { useUserStore } from '@/entities/user'
// import { useMapStore } from '@/entities/map'

const emit = defineEmits<{
    (e: 'move-button-click', cellNumber: number): void
}>()

// const userStore = useUserStore()
// const mapStore = useMapStore()

const { rolls, isLoading, error, loadRolls } = useRolls()

// const rollsJournalRef = ref<HTMLElement | null>(null)
const open = ref(false)
const selectedRoll = ref(0)

const referenceElement = ref<HTMLElement | null>(null)

// const ascendDestination = computed<number>(() => {
//     return Math.max(1, mapStore.tokenCell - selectedRoll.value + 1)
// })

// const descendDestination = computed<number>(() => {
//     return Math.min(
//         mapStore.lastCell,
//         mapStore.tokenCell + selectedRoll.value + 1,
//     )
// })

// const isPopoverOpened = computed<boolean>({
//     get: () => {
//         return open.value && !mapStore.moveInterval
//     },
//     set: (value) => {
//         open.value = value
//     },
// })

const handleCardClick = (result: number, target: HTMLElement) => {
    referenceElement.value = target
    selectedRoll.value = result
    open.value = true
}

// const handleMoveUpButtonClick = () => {
//     open.value = false
//     emit('move-button-click', ascendDestination.value - 1)
// }

// const handleMoveDownButtonClick = () => {
//     open.value = false
//     emit('move-button-click', descendDestination.value - 1)
// }

onMounted(async () => {
    try {
        await loadRolls({
            page: 1,
            pageSize: 20,
            sort: 'date:desc',
        })
    } catch (err) {
        console.error('Ошибка при загрузке бросков:', err)
    }
})
</script>

<template>
    <section class="rolls-journal relative">
        <h3 class="sr-only">Журнал бросков</h3>

        <!-- Индикатор загрузки -->
        <div v-if="isLoading && rolls.length === 0" class="py-12 text-center">
            <div class="mb-4 text-6xl">⏳</div>
            <p class="font-amatic text-2xl font-bold text-gray-500">
                Загрузка бросков...
            </p>
        </div>

        <!-- Сообщение об ошибке -->
        <div v-else-if="error" class="w-full py-12 text-center">
            <u-empty
                variant="naked"
                icon="i-material-symbols:chat-error-rounded"
                title="Ошибка"
                size="xl"
                :description="error"
                :actions="[]"
                :ui="{
                    title: 'text-3xl text-muted',
                }"
            />
        </div>

        <!-- Пустой журнал -->
        <figure v-else-if="rolls.length === 0" class="py-12 text-center">
            <span class="mb-4 text-6xl">📔</span>
            <figcaption class="font-amatic text-2xl font-bold text-gray-500">
                Журнал бросков пуст
            </figcaption>
        </figure>
        <!-- <u-popover
            v-if="userStore.user"
            v-model:open="isPopoverOpened"
            :reference="rollsJournalRef?.parentElement?.parentElement ?? undefined"
            :ui="{
                content: 'relative rounded-3xl p-4 shadow-sm top-0',
                arrow: 'size-2',
            }"
            :content="{
                align: 'start',
                side: 'top',
                sideOffset: 2,
            }"
            arrow
        >
            <template #content>
                <div class="flex items-center gap-6">
                    <span class="ml-2 text-3xl font-bold">
                        {{ selectedRoll }}
                    </span>
                    <ul class="bg-base relative flex flex-col gap-4">
                        <li v-if="mapStore.tokenCell > 0">
                            <u-button
                                @click="handleMoveUpButtonClick"
                                class="w-full rounded-3xl bg-blue-300"
                            >
                                🔼 Подняться на {{ ascendDestination }}
                            </u-button>
                        </li>
                        <li>
                            <u-button
                                @click="handleMoveDownButtonClick"
                                class="w-full rounded-3xl bg-green-300"
                            >
                                🔽 Спуститься на {{ descendDestination }}
                            </u-button>
                        </li>
                    </ul>
                </div>
            </template>
        </u-popover> -->
        <transition-group name="roll-item" tag="ul" class="space-y-2">
            <li v-for="roll in rolls" :key="roll.id">
                <rolls-card
                    :roll="roll"
                    class="relative"
                    @click="handleCardClick(roll.rollResult.result, $el)"
                />
            </li>
        </transition-group>
    </section>
</template>

<style scoped>
.roll-item-enter-active {
    transition: all 0.4s ease-out;
}

.roll-item-leave-active {
    transition: all 0.3s ease-in;
}

.roll-item-enter-from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

.roll-item-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

.roll-item-move {
    transition: transform 0.3s ease;
}
</style>
