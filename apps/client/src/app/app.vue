<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { DefaultLayout } from '@/shared/ui/layouts'
import { MainHeader } from '@/widgets/main-header'
import { useBannerStore } from '@/entities/banner/model/store'

const route = useRoute()

const bannerStore = useBannerStore()

const layout = computed(() => route.meta.layout || DefaultLayout)

onMounted(async () => {
    await bannerStore.fetchBanners()
})
</script>

<template>
    <u-app>
        <component :is="layout">
            <template #header>
                <main-header class="max-w-auto mx-auto w-full" />
            </template>

            <template #default>
                <router-view />
            </template>
        </component>
    </u-app>
</template>
