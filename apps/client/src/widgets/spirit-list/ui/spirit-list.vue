<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { Spirit } from '@/entities/spirit'
import { SpiritCard } from '@/widgets/spirit-card'

const props = defineProps<{
    spirits: Spirit[]
    isLoadingMore?: boolean
    loadingLabel?: string
}>()

const showAchievements = ref(true)

const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)

const virtualizerOptions = computed(() => ({
    count: props.spirits.length,
    estimateSize: () => 137,
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

const updateOffset = () => {
    parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
}

const emit = defineEmits(['load-more'])

// Следим за виртуальными элементами и вызываем load-more, если последний элемент видим
watch(
    () => virtualItems.value,
    (items) => {
        if (!items.length) return
        const last = items[items.length - 1]
        // Если последний элемент видим и это не пустой список
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
    <div class="mb-4 flex items-center justify-between">
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

    <div ref="parentRef" class="relative pb-32">
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
                <ul>
                    <li
                        v-for="virtualItem in virtualItems"
                        :key="String(virtualItem.key)"
                        :ref="measureElement"
                        :data-index="virtualItem.index"
                        class="mb-4 transition-transform duration-200 [&:last-child]:mb-8"
                    >
                        <spirit-card
                            v-if="spirits[virtualItem.index]"
                            :spirit="spirits[virtualItem.index]!"
                            :index="virtualItem.index"
                            :show-achievements="showAchievements"
                        />
                    </li>
                </ul>
                <div
                    v-if="isLoadingMore"
                    class="font-amatic py-4 text-center text-2xl font-bold text-gray-500"
                >
                    {{ loadingLabel }}
                </div>
            </div>
        </div>
    </div>
</template>
