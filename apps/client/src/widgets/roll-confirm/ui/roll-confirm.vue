<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Dice, getDiceIcon } from '@/entities/dice'
import { RollResult, RollButton, displayRollToast } from '@/features/dice'
import type { RollConfirmAction } from '@/widgets/roll-confirm'

const ROLL_MODE_ITEMS = [
    { label: 'Без модификаторов', value: 'none' },
    { label: 'Преимущество', value: 'advantage' },
    { label: 'Помеха', value: 'disadvantage' },
]

const emit = defineEmits<{
    (e: 'close', action: RollConfirmAction, result?: RollResult): void
}>()

defineProps<{ dice?: Dice | null }>()

const route = useRoute()

const rollMode = ref<'none' | 'advantage' | 'disadvantage'>('none')

const isMapRoute = computed(() => route.path === '/map')

function onRoll(action: RollConfirmAction, result: RollResult) {
    emit('close', action, result)
    displayRollToast(result)
}
</script>

<template>
    <u-modal
        :close="{ onClick: () => emit('close', 'cancel') }"
        :ui="{ content: 'max-w-md' }"
    >
        <template #content>
            <div class="flex flex-col gap-6 p-6">
                <h2 class="text-center text-2xl font-bold">
                    Выберите действие
                </h2>
                <div v-if="dice" class="flex items-center justify-center gap-4">
                    <u-icon
                        :name="getDiceIcon(dice)"
                        class="text-primary text-7xl"
                    />
                    <h3 class="font-amatic text-center text-7xl font-bold">
                        {{ `D${dice}` }}
                    </h3>
                </div>

                <u-radio-group
                    v-model="rollMode"
                    :items="ROLL_MODE_ITEMS"
                    color="primary"
                    orientation="horizontal"
                    class="mx-auto mb-2"
                />
                <div class="grid grid-cols-2 gap-3">
                    <roll-button
                        v-if="dice && isMapRoute"
                        color="primary"
                        block
                        variant="subtle"
                        label="Движение вперёд"
                        :dice="dice"
                        @roll="onRoll('forward', $event)"
                    />
                    <roll-button
                        v-if="dice && isMapRoute"
                        color="primary"
                        block
                        variant="subtle"
                        label="Движение назад"
                        :dice="dice"
                        @roll="onRoll('backward', $event)"
                    />
                    <roll-button
                        v-if="dice"
                        color="primary"
                        block
                        variant="solid"
                        :dice="dice"
                        :advantage="rollMode === 'advantage'"
                        :disadvantage="rollMode === 'disadvantage'"
                        @roll="onRoll('roll', $event)"
                        label="Бросить кости"
                    />
                    <u-button
                        color="neutral"
                        block
                        variant="outline"
                        @click="emit('close', 'cancel')"
                        label="Отмена"
                    />
                </div>
            </div>
        </template>
    </u-modal>
</template>
