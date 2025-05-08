<script setup lang="ts">
import { computed } from 'vue'
import type { Banner } from '@/entities/banner'

const props = defineProps<{
    banner: Banner
    height?: number
    width?: number
}>()

const isVideo = computed<boolean>(() =>
    props.banner.media.mime.includes('video'),
)
</script>

<template>
    <div class="flex items-center justify-center">
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
            <img
                v-else-if="banner?.media?.url"
                :src="banner.media.url"
                :width="width ?? banner.media.width"
                :height="width ? 'auto' : banner.media.height"
                :alt="banner.media.alternativeText ?? 'Баннер марафона'"
                class="mx-auto"
            />
        </a>
    </div>
</template>
