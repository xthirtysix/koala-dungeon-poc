<script setup lang="ts">
import { ref, computed } from 'vue'
import { type DropdownMenuItem } from '@nuxt/ui'
import { DicePool } from '@/widgets/dice-pool'
import { DiceIcon } from '@/entities/dice';

const emit = defineEmits<{
    (e: 'roll-dice', value: number): void
}>()

const props = withDefaults(
    defineProps<{
        dice: 4 | 6 | 8 | 10 | 12 | 20
        label: string
        icon?: string
        isNegative?: boolean
        throwVariants?: DropdownMenuItem[]
    }>(),
    {
        isNegative: false,
    },
)

const toast = useToast()

const open = ref(false)

const secondaryButtons = computed<DropdownMenuItem[]>(() => {
    if (!props.throwVariants) return []

    return [
        ...props.throwVariants,
        {
            label: 'Настроить',
            icon: 'i-material-symbols:settings-suggest',
            onSelect: () => (open.value = true),
        },
    ]
})

function onDicePoolThrow(value: number) {
    emit('roll-dice', value)
    open.value = false
}

function onMainDiceThrow() {
    const result = (Math.floor(Math.random() * props.dice) + 1) * (props.isNegative ? -1 : 1)

    toast.add({
        title: 'Результат броска',
        description: `На d${props.dice} выпало: ${result}`,
        color: 'primary',
        icon: DiceIcon[`D${props.dice}` as keyof typeof DiceIcon],
        ui: {
            icon: 'w-12 h-12',
        },
    })

    emit('roll-dice', result)
}
</script>

<template>
    <u-button-group>
        <u-button
            :label="label"
            color="primary"
            variant="subtle"
            :leading-icon="icon"
            @click="onMainDiceThrow"
            :ui="{
                base: 'w-full flex mx-auto',
                trailingIcon: 'size-10',
                label: 'font-amatic text-2xl font-bold text-center mx-auto',
            }"
        />

        <u-dropdown-menu
            v-if="secondaryButtons.length"
            :items="secondaryButtons"
        >
            <u-button
                color="primary"
                variant="subtle"
                icon="i-lucide-chevron-down"
            />
        </u-dropdown-menu>
        <u-button
            v-else
            color="primary"
            variant="subtle"
            icon="i-material-symbols:settings-suggest"
            @click="open = true"
        />
    </u-button-group>
    <u-drawer
        direction="right"
        v-model:open="open"
        :ui="{
            content: 'py-6',
        }"
    >
        <template #content>
            <div class="grid h-auto content-start">
                <dice-pool
                    class="mx-4 mt-10 mb-auto grid min-w-[300px]"
                    @roll-dice="onDicePoolThrow"
                />
            </div>
        </template>
    </u-drawer>
</template>
