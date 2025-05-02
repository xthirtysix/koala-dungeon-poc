<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { DefaultLayout } from '@/shared/ui/layouts'
import { MainHeader } from '@/widgets/main-header'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<template>
    <u-app>
        <component :is="layout">
            <template #header>
                <main-header class="w-full max-w-auto mx-auto" />
            </template>

            <template #default>
                <router-view />
            </template>
        </component>
    </u-app>
</template>
