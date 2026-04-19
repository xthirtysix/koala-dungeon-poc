<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { Spirit } from '@/entities/spirit'
import { SpiritCard } from '@/widgets/spirit-card'

const props = defineProps<{
    spirits: Spirit[]
}>()

const emit = defineEmits<{
    (e: 'load-more'): void
}>()

const showAchievements = ref(true)

const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)

const ITEM_GAP = 16

const virtualizerOptions = computed(() => ({
    count: props.spirits.length,
    estimateSize: () => 137,
    scrollMargin: parentOffsetRef.value,
    gap: ITEM_GAP,
    overscan: 5,
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

const updateOffset = () => {
    parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
}

// Следим за виртуальными элементами и вызываем load-more, если последний элемент видим
watch(
    () => virtualItems.value,
    (items) => {
        if (!items.length) return
        const last = items[items.length - 1]

        if (last.index >= props.spirits.length - 1) {
            emit('load-more')
        }
    },
)

onMounted(() => {
    updateOffset()
    window.addEventListener('resize', updateOffset)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateOffset)
})
</script>

<template>
    <div class="flex items-center justify-between">
        <h3 class="font-amatic text-3xl font-bold">Все участники</h3>
        <u-button
            color="neutral"
            variant="ghost"
            :icon="
                showAchievements ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'
            "
            @click="showAchievements = !showAchievements"
        >
            <span class="hidden md:block">
                {{
                    showAchievements
                        ? 'Скрыть достижения'
                        : 'Показать достижения'
                }}
            </span>
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
            <div
                :style="{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${containerOffset}px)`,
                }"
            >
                <ul class="flex flex-col gap-4">
                    <li
                        v-for="virtualItem in virtualItems"
                        :key="String(virtualItem.key)"
                        :ref="measureElement"
                        :data-index="virtualItem.index"
                        class="transition-transform duration-200"
                    >
                        <spirit-card
                            v-if="spirits[virtualItem.index]"
                            :spirit="spirits[virtualItem.index]"
                            :place="virtualItem.index + 1"
                            :achievements="showAchievements"
                            with-data
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
