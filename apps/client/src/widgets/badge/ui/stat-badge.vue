<script setup lang="ts">
import strengthIcon from '@/app/assets/images/characteristics/0_strength.webp'
import constitutionIcon from '@/app/assets/images/characteristics/1_constitution.webp'
import dexterityIcon from '@/app/assets/images/characteristics/2_dexterity.webp'
import wisdomIcon from '@/app/assets/images/characteristics/3_wisdom.webp'

defineProps<{
    characteristic: string
    value: number
    isNegative: boolean
}>()

function getStatIcon(characteristic: string): string {
    const icons: Record<string, string> = {
        сила: strengthIcon,
        ловкость: dexterityIcon,
        телосложение: constitutionIcon,
        мудрость: wisdomIcon,
    }
    return icons[characteristic]
}

function getStatValueClass(isNegative: boolean): string {
    return isNegative
        ? 'text-red-600 capitalize'
        : 'text-emerald-600 capitalize'
}
</script>

<template>
    <div class="stat-badge flex items-center gap-1 p-0">
        <img
            :src="getStatIcon(characteristic)"
            :alt="characteristic"
            class="h-6 w-6 lg:h-8 lg:w-8"
        />
        <slot name="label" :class="getStatValueClass(isNegative)">
            <span
                class="font-amatic text-2xl font-bold capitalize"
                :class="getStatValueClass(isNegative)"
            >
                {{ isNegative ? '-' : '+' }} {{ value }}
                {{ characteristic.toUpperCase() }}
            </span>
        </slot>
    </div>
</template>
