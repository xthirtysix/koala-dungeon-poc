<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Dice, getDiceIcon } from '@/entities/dice'
import {
    ENABLE_MOVEMENT_BUTTONS,
    type RollConfirmAction,
} from '@/widgets/roll-confirm'

const ROLL_MODE_ITEMS = [
    { label: 'Без модификаторов', value: null },
    { label: 'Преимущество', value: 'advantage' },
    { label: 'Помеха', value: 'disadvantage' },
]

const emit = defineEmits<{
    (e: 'close', result: { action: RollConfirmAction; dice?: Dice }): void
}>()

const props = defineProps<{
    dice: Dice
    title?: string
    description?: string
}>()

const route = useRoute()

const rollMode = ref<'advantage' | 'disadvantage' | null>(null)

const isMapRoute = computed(() => route.path === '/map')

function onRoll(action: RollConfirmAction) {
    emit('close', { action, dice: props.dice })
}
</script>

<template>
    <u-modal
        :close="{ onClick: () => emit('close', { action: 'cancel' }) }"
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
                    <template v-if="ENABLE_MOVEMENT_BUTTONS">
                        <u-button
                            v-if="dice && isMapRoute"
                            color="primary"
                            block
                            variant="subtle"
                            label="Движение вперёд"
                            @click="onRoll('forward')"
                        />
                        <u-button
                            v-if="dice && isMapRoute"
                            color="primary"
                            block
                            variant="subtle"
                            label="Движение назад"
                            @click="onRoll('backward')"
                        />
                    </template>
                    <u-button
                        v-if="dice"
                        color="primary"
                        variant="solid"
                        label="Бросить кости"
                        block
                        @click="onRoll(rollMode ?? 'roll')"
                    />
                    <u-button
                        color="neutral"
                        block
                        variant="outline"
                        label="Отмена"
                        @click="emit('close', { action: 'cancel' })"
                    />
                </div>
            </div>
        </template>
    </u-modal>
</template>
