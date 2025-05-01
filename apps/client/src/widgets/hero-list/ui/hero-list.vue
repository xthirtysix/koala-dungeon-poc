<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Hero } from '@/entities/hero'
import { HeroCard } from '@/widgets/hero-card'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { ComponentPublicInstance } from 'vue'

const props = defineProps<{
    heroes: Hero[]
}>()

const showAchievements = ref(true)

const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)

const virtualizerOptions = computed(() => ({
    count: props.heroes.length,
    estimateSize: () => 200,
    scrollMargin: parentOffsetRef.value,
}))

const virtualizer = useWindowVirtualizer(virtualizerOptions)

const virtualItems = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())
const containerOffset = computed(() => {
    const firstItem = virtualItems.value[0]
    if (!firstItem) return 0
    return firstItem.start - virtualizer.value.options.scrollMargin
})

const measureElement = (el: Element | ComponentPublicInstance | null) => {
    if (!el || !(el instanceof HTMLElement)) return
    virtualizer.value.measureElement(el)
}

onMounted(() => {
    parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})
</script>

<template>
    <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">Все участники</h3>
        <u-button
            color="neutral"
            variant="ghost"
            :icon="
                showAchievements ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'
            "
            @click="showAchievements = !showAchievements"
        >
            {{ showAchievements ? 'Скрыть достижения' : 'Показать достижения' }}
        </u-button>
    </div>

    <div ref="parentRef" class="relative">
        <div
            :style="{
                height: `${totalSize}px`,
                width: '100%',
                position: 'relative',
                overflowAnchor: 'none',
            }"
        >
            <ul
                :style="{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${containerOffset}px)`,
                }"
            >
                <li
                    v-for="virtualItem in virtualItems"
                    :key="String(virtualItem.key)"
                    :ref="measureElement"
                    :data-index="virtualItem.index"
                    class="transition-transform duration-200 [&:last-child]:mb-8 mb-4"
                >
                    <hero-card
                        v-if="heroes[virtualItem.index]"
                        :hero="heroes[virtualItem.index]!"
                        :index="virtualItem.index"
                        :show-achievements="showAchievements"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>
