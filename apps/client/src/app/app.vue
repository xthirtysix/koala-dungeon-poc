<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useBannerStore } from '@/entities/banner'
import { MainHeader } from '@/widgets/main-header'
import { DefaultLayout } from '@/shared/ui/layouts'

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
                <main-header />
            </template>

            <template #default>
                <router-view />
            </template>
        </component>
    </u-app>
</template>
