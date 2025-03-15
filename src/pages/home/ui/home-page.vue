<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
})
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between">
                <h1>Здесь мог бы быть UI персонажа, но я его не сделал</h1>
                <UButton
                    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                    color="neutral"
                    variant="ghost"
                    @click="isDark = !isDark"
                />
            </div>
        </template>
    </UCard>
</template>
