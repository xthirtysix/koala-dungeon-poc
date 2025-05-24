<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DiceButton } from '@/entities/dice'
import { displayRollToast, RollButton, RollResult } from '@/features/dice'
import { RollConfirmAction } from '@/widgets/roll-confirm'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = withDefaults(
    defineProps<{
        dices?: Array<4 | 6 | 8 | 10 | 12 | 20>
        dicesDefaults?: Partial<Record<4 | 6 | 8 | 10 | 12 | 20, number>>
        positiveLabel?: string
        negativeLabel?: string
    }>(),
    {
        dices: () => [4, 6, 8, 10, 12, 20],
        dicesDefaults: () => ({
            4: 0,
            6: 0,
            8: 0,
            10: 0,
            12: 0,
            20: 0,
        }),
        positiveLabel: 'Вперед',
        negativeLabel: 'Назад',
    },
)

const diceValues = ref<Record<number, number>>({})

const isRollDisabled = computed(() =>
    Object.values(diceValues.value).every((v) => v === 0),
)

function initDiceValues() {
    diceValues.value = {}
    props.dices.forEach((dice) => {
        diceValues.value[dice] = props.dicesDefaults[dice] ?? 0
    })
}

function onRoll(_action: RollConfirmAction, result: RollResult) {
    emit('close')
    displayRollToast(result)
}

watch(() => props.dices, initDiceValues, { immediate: true })
</script>

<template>
    <div class="grid auto-rows-min items-start gap-6">
        <ul class="grid grid-cols-1 justify-center gap-4">
            <li
                v-for="dice in dices"
                :key="dice"
                class="grid min-w-24 grid-cols-[min-content_1fr] items-center gap-1 rounded-md border-2 border-gray-200 p-2 dark:border-gray-800"
            >
                <dice-button
                    :dice="dice"
                    class="pointer-events-none row-span-2 scale-90"
                />
                <span class="mb-1 w-8 text-xs font-semibold text-gray-500"
                    >d{{ dice }}</span
                >
                <u-input-number
                    v-model="diceValues[dice]"
                    variant="ghost"
                    :min="0"
                    :default="0"
                />
            </li>
        </ul>

        <roll-button
            :dice="diceValues"
            label="Бросить"
            trailing-icon="i-game-icons:rolling-dices"
            color="primary"
            variant="subtle"
            :ui="{
                label: 'mx-auto font-amatic text-2xl font-bold',
                base: 'w-full',
            }"
            :disabled="isRollDisabled"
            @roll="onRoll('roll', $event)"
        />
    </div>
</template>
