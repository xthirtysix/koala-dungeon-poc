<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { SlotDrum, type SlotDrumItem } from '@/widgets/slot-drum'
import { RandomizerList } from '@/widgets/randomizer-list'
import { MOCK_ITEMS } from '../consts/randomizer-page.mocks'

const demoItems = ref(MOCK_ITEMS)
const result = ref<SlotDrumItem | undefined>()
const drum = useTemplateRef('drum')

const buttonLabel = computed(() => {
    switch (drum.value?.state) {
        case 'await':
            return 'Ожидаем результат'
        case 'spinning':
            return 'Остановить'
        default:
            return 'Крутить'
    }
})

function onButtonClick() {
    switch (drum.value?.state) {
        case 'spinning':
            drum.value.stop()
            break
        case 'ready':
            drum.value.spin()
            break
        default:
            return
    }
}

function onSpinResult(index: number) {
    result.value = demoItems.value[index]
}
</script>

<template>
    <div class="randomizer-page">
        <h1 class="font-amatic mb-6 text-3xl font-bold">Рандомайзер</h1>

        <u-card
            :ui="{
                body: 'flex py-0 sm:py-0 justify-between',
                footer: 'flex justify-between items-center',
            }"
        >
            <slot-drum ref="drum" :items="demoItems" @result="onSpinResult" />
            <randomizer-list :items="demoItems" class="mt-3 min-w-[18rem]" />
            <template #footer>
                <u-button
                    :disabled="drum?.state === 'await'"
                    @click="onButtonClick"
                >
                    {{ buttonLabel }}
                </u-button>
                <span v-if="result">{{ result.label }}</span>
            </template>
        </u-card>
    </div>
</template>
