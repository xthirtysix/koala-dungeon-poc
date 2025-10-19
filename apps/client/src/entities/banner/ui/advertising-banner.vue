<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Banner } from '@/entities/banner'

const props = defineProps<{
    banner: Banner
    height?: number
    width?: number
}>()

const imageRef = ref<HTMLImageElement | null>(null)
const isLoaded = ref<boolean>(false)

const isVideo = computed<boolean>(() =>
    props.banner.media.mime.includes('video'),
)

watch([props.banner, imageRef], () => {
    if (props.banner.media.mime.includes('video')) return

    isLoaded.value = false
    const image = new Image()
    image.onload = () => {
        if (imageRef.value && 'src' in imageRef.value) {
            imageRef.value.src = props.banner.media.url
            isLoaded.value = true
        }
    }
    image.src = props.banner.media.url
})
</script>

<template>
    <div class="relative flex items-center justify-center">
        <a :href="banner?.link" target="_blank">
            <video
                v-if="isVideo"
                :width="width ?? banner.media.width"
                :height="width ? 'auto' : banner.media.height"
                autoplay
                muted
                loop
                class="mx-auto"
            >
                <source :src="banner?.media.url" :type="banner.media.mime" />
            </video>
            <figure
                v-else-if="banner?.media?.url"
                class="relative rounded-3xl shadow-md ring-1 ring-neutral-200 dark:ring-neutral-800"
            >
                <img
                    ref="imageRef"
                    :width="width ?? banner.media.width"
                    :height="width ? 'auto' : banner.media.height"
                    :alt="banner.media.alternativeText ?? 'Баннер марафона'"
                    :class="{
                        'mx-auto': true,
                        'rounded-3xl shadow-lg': isLoaded,
                    }"
                />
            </figure>
        </a>
    </div>
</template>
