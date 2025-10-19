<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useColorMode } from '@vueuse/core'
import type { DropdownMenuItem } from '@nuxt/ui'
import { Theme } from '@/widgets/main-header'
import { useUser } from '@/features/user'

interface Props {
    src?: string
    alt?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

defineProps<Props>()

const colorMode = useColorMode()
const { logout } = useUser()

const open = ref(false)

const isDark = computed({
    get() {
        return colorMode.value === Theme.DARK
    },
    set() {
        colorMode.value =
            colorMode.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
    },
})

const items = computed<DropdownMenuItem[]>(() => [
    {
        label: isDark.value ? 'Светлая тема' : 'Тёмная тема',
        icon: isDark.value ? 'i-lucide-sun' : 'i-lucide-moon',
        slot: 'profile' as const,
        onClick: async () => {
            await nextTick()
            isDark.value = !isDark.value
        },
    },
    {
        label: 'Выйти',
        icon: 'i-lucide-log-out',
        onClick: logout,
    },
])
</script>

<template>
    <u-dropdown-menu
        v-model:open="open"
        :items="items"
        :popper="{ placement: 'bottom-end' }"
    >
        <u-avatar :src="src" :alt="alt" :size="size" class="cursor-pointer" />
    </u-dropdown-menu>
</template>
