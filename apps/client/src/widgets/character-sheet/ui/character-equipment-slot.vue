<script setup lang="ts">
import { computed } from 'vue'
import { type Artefact } from '@/entities/artefact'
import strengthIcon from '@/app/assets/images/characteristics/0_strength.webp'
import constitutionIcon from '@/app/assets/images/characteristics/1_constitution.webp'
import dexterityIcon from '@/app/assets/images/characteristics/2_dexterity.webp'
import wisdomIcon from '@/app/assets/images/characteristics/3_wisdom.webp'
import durabilityIcon from '@/app/assets/images/characteristics/curse_icon.webp'
import { type CharacterSlot } from '@/entities/character'

const props = defineProps<{
    artefact?: Partial<Artefact> | null
    slot?: CharacterSlot
    usages?: number
}>()

const charIcons: Record<string, string> = {
    сила: strengthIcon,
    телосложение: constitutionIcon,
    ловкость: dexterityIcon,
    мудрость: wisdomIcon,
}

const getArtefactDetails = computed(() => {
    if (!props.artefact) return []
    const details = []
    if (props.artefact.bonus && Array.isArray(props.artefact.bonus)) {
        details.push(
            ...props.artefact.bonus.map((bonus: any) => ({
                type: 'bonus',
                ...bonus,
            })),
        )
    }
    if (typeof props.artefact.durability !== 'undefined') {
        details.push({
            type: 'durability',
            value: props.artefact.durability,
        })
    }
    return details
})

const popoverLabel = computed<string | undefined>(() => {
    if (!props.artefact || !props.slot) return undefined

    return props.artefact?.durability
        ? `Прочность ${Math.max(props.artefact.durability - (props.usages ?? 0), 0)}`
        : 'Не ломается'
})

const labelBySlot = computed<string>(() => {
    if (!props.slot) return ''

    switch (props.slot) {
        case 'head':
            return 'Голова'
        case 'chest':
            return 'Нагрудник'
        case 'hands':
            return 'Руки'
        case 'feet':
            return 'Ноги'
        case 'weapon':
            return 'Оружие'
        default:
            return 'Пояс'
    }
})
</script>

<template>
    <u-popover
        mode="click"
        :ui="{
            content: 'rounded-3xl',
        }"
    >
        <figure
            class="border-inverted relative flex min-h-0 w-auto items-center justify-center rounded-3xl border bg-gray-200 text-gray-400 capitalize dark:bg-gray-700"
            :class="{
                'cursor-help': !!artefact,
                'border-dashed': !artefact,
            }"
        >
            <img
                v-if="artefact"
                class="h-auto w-[75%]"
                :src="artefact?.image?.url"
                :alt="artefact?.image?.alt"
            />
            <span v-else class="font-amatic text-2xl font-bold">
                {{ labelBySlot }}
            </span>
        </figure>

        <template #content>
            <article
                v-if="artefact"
                class="bg-base flex max-w-70 flex-col items-center justify-center p-4 text-base"
            >
                <h4 class="font-amatic mb-3 text-center text-3xl font-bold">
                    {{ artefact?.name }}
                </h4>
                <div
                    v-if="getArtefactDetails.length"
                    class="flex flex-col items-start justify-start gap-1 font-bold"
                >
                    <div
                        v-for="detail in getArtefactDetails"
                        :key="
                            detail.type === 'bonus' ? detail.id : 'durability'
                        "
                        class="z-20 flex items-center justify-center gap-2 text-sm"
                    >
                        <template v-if="detail.type === 'bonus'">
                            <img
                                :src="
                                    charIcons[
                                        detail.characteristic.toLowerCase()
                                    ]
                                "
                                :alt="detail.characteristic"
                                class="h-7 w-7"
                            />
                            <span
                                :class="
                                    detail.isNegative
                                        ? 'text-red-400'
                                        : 'text-green-400'
                                "
                            >
                                {{ detail.isNegative ? '-' : '+' }}
                                {{ detail.value }}
                                {{ detail.characteristic.toUpperCase() }}
                            </span>
                        </template>
                    </div>

                    <div
                        class="durability-badge flex items-center gap-1 rounded p-0"
                    >
                        <img
                            :src="durabilityIcon"
                            alt="Прочность"
                            class="h-7 w-7"
                        />
                        <p
                            class="inline-flex items-center gap-2 text-sm font-bold text-black uppercase dark:text-white"
                        >
                            {{ popoverLabel }}
                        </p>
                    </div>

                    <p class="mt-3 text-base font-medium">
                        {{ artefact.description }}
                    </p>
                </div>
            </article>
        </template>
    </u-popover>
</template>
