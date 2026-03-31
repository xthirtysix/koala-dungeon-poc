<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Dice, getDiceIcon } from '@/shared/tools/dice'
import {
    ENABLE_MOVEMENT_BUTTONS,
    type RollConfirmAction,
} from '@/widgets/roll-confirm'
import { StatKey } from '@/shared/model/stats/stats.types'
import { useCharacter } from '@/entities/character'
import tokenImg from '@/app/assets/images/token.webp'

const ROLL_MODE_ITEMS = [
    { label: 'Без модификаторов', value: null },
    { label: 'Преимущество', value: 'advantage' },
    { label: 'Помеха', value: 'disadvantage' },
]

const emit = defineEmits<{
    (
        e: 'close',
        result: { action: RollConfirmAction; dice?: Dice; bonus?: number },
    ): void
}>()

const props = defineProps<{
    dice: Dice
    statCheck?: StatKey
    title?: string
    description?: string
}>()

const route = useRoute()
const character = useCharacter()

const rollMode = ref<'advantage' | 'disadvantage' | null>(null)

const isMapRoute = computed(() => route.path === '/map')

const naturalStatValue = computed(() => {
    return character.attributes.value.find(
        (attribute) => attribute.key === props.statCheck,
    )?.value
})

const bonusLabel = computed(() => {
    const labelPrefix = 'Модификатор'
    const labelSuffix = `${totalBonus.value > 0 ? '+' : ''}${totalBonus.value || ''}`

    switch (props.statCheck) {
        case 'strength':
            return `${labelPrefix} силы: ${labelSuffix}`
        case 'dexterity':
            return `${labelPrefix} ловкости: ${labelSuffix}`
        case 'constitution':
            return `${labelPrefix} телосложения: ${labelSuffix}`
        case 'wisdom':
            return `${labelPrefix} мудрости: ${labelSuffix}`
        default:
            return ''
    }
})

const totalBonus = computed(() => {
    const equipmentBonus = props.statCheck
        ? character.equipmentBonusesByStat.value[props.statCheck]?.totalBonus
        : 0

    return (equipmentBonus ?? 0) + (naturalStatValue.value ?? 0)
})

function onRoll(action: RollConfirmAction) {
    emit('close', {
        action,
        dice: props.dice,
        bonus: totalBonus.value,
    })
}
</script>

<template>
    <u-modal
        :close="{ onClick: () => emit('close', { action: 'cancel' }) }"
        :ui="{
            content:
                'max-w-md grid divide-none p-6 gap-x-6 gap-y-6 grid-cols-[max-content_1fr]',
        }"
    >
        <template #content>
            <h2 class="col-span-full text-2xl font-bold">Выберите действие</h2>
            <div v-if="dice" class="flex items-start gap-2">
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
                orientation="vertical"
                :ui="{ root: 'mx-auto', fieldset: 'gap-2' }"
            />

            <div class="col-span-full">
                <template v-if="statCheck">
                    <h4 class="mb-4 text-2xl font-bold">
                        {{ bonusLabel }}
                    </h4>
                    <ul class="flex gap-2">
                        <li
                            v-if="naturalStatValue"
                            class="flex items-center gap-2 rounded-3xl bg-gray-100 px-3 py-2 text-gray-400 capitalize ring-1 ring-gray-300 dark:bg-gray-700 dark:ring-gray-500"
                        >
                            <img :src="tokenImg" class="h-12 w-12" />
                            <span class="font-amatic text-3xl font-bold">
                                {{ naturalStatValue }}
                            </span>
                        </li>
                        <li
                            v-for="artefact in character.equipmentBonusesByStat
                                .value[statCheck]?.artefacts"
                            :key="artefact.id"
                            class="flex items-center gap-2 rounded-3xl bg-gray-100 px-3 py-2 text-gray-400 capitalize ring-1 ring-gray-300 dark:bg-gray-700 dark:ring-gray-500"
                        >
                            <img
                                :src="artefact.image.url"
                                :alt="artefact.name"
                                class="h-12 w-12"
                            />
                            <span
                                class="font-amatic text-3xl font-bold"
                                :class="
                                    artefact.properties[statCheck] > 0
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                "
                            >
                                {{ artefact.properties[statCheck] }}
                            </span>
                        </li>
                    </ul>
                </template>

                <div class="mt-8 flex items-center gap-3">
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
