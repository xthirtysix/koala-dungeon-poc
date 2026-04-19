<script setup lang="ts">
import { type Achievement } from '@/entities/achievement'
import { onUnmounted, ref } from 'vue'

const props = withDefaults(
    defineProps<{
        achievement: Achievement
        side?: 'left' | 'right' | 'top' | 'bottom'
        size?: 'md' | 'lg'
        hint?: boolean
    }>(),
    {
        size: 'md',
    },
)

const isLoading = ref(true)

const image = new Image()
image.src = props.achievement.image.url

image.onload = () => {
    isLoading.value = false
}
image.onerror = () => {
    isLoading.value = false
}

onUnmounted(() => {
    image.onload = null
    image.onerror = null
})
</script>

<template>
    <div class="flex gap-1">
        <u-popover v-if="hint"
                   :content="{ side }"
                   :ui="{
                    content:
                        'flex w-[300px] flex-col items-center gap-2 rounded-3xl p-4',
                }">
            <figure class="relative flex cursor-help justify-center">
                <div v-if="isLoading"
                     class="min-w-[100px] flex items-center justify-center py-[2px]">
                    <u-skeleton
                                class="w-20 h-20  [clip-path:polygon(50%_0%,93.3013%_25%,93.3013%_75%,50%_100%,6.6987%_75%,6.6987%_25%)]" />
                </div>
                <img v-else
                     :src="achievement.image?.url"
                     :alt="achievement.name"
                     :width="size === 'md' ? 84 : 100"
                     :class="size === 'md' ? 'w-[84px]' : 'w-[100px] max-h-[84px]'"
                     class="object-contain" />
            </figure>

            <template #content>
                <img :src="achievement.image.url"
                     :alt="achievement.name"
                     width="200"
                     class="w-[200px] object-contain" />
                <h3 class="kd-h2 text-center">
                    {{ achievement.name }}
                </h3>
                <p class="text-center text-sm text-gray-800 dark:text-gray-200">
                    {{ achievement.description }}
                </p>
            </template>
        </u-popover>

        <figure v-else
                class="relative flex cursor-help items-center justify-center">
            <u-skeleton v-if="isLoading"
                        class="mx-[1.125rem] h-21 w-21 [clip-path:polygon(50%_0%,93.3013%_25%,93.3013%_75%,50%_100%,6.6987%_75%,6.6987%_25%)]" />
            <img v-else
                 :src="achievement.image?.url"
                 :alt   ="achievement.name"
                 :width="size === 'md' ? 84 : 120"
                 :class="size === 'md' ? 'w-[84px]' : 'w-[120px]'"
                 class="object-contain" />
        </figure>
    </div>
</template>
