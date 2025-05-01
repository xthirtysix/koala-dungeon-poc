<script setup lang="ts">
import type { MDCData } from '@nuxtjs/mdc'
import { TableOfContents } from '@/widgets/table-of-contents'
import { rules } from '@/pages/rules'

defineOptions({
    name: 'rules-page',
})

const { data }: { data: Ref<MDCData> } = await useAsyncData(
    'marathon-rules',
    () => parseMarkdown(rules),
)
</script>

<template>
    <h1 class="kd-h1">Правила марафона</h1>
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 w-full">
        <m-d-c
            :value="rules"
            tag="article"
            class="prose dark:prose-invert max-w-full"
        />
        <div class="hidden lg:block">
            <table-of-contents
                :links="data.toc.links"
                title="На этой странице"
                class="fixed -mt-15 pr-4 overflow-y-auto toc-el"
            />
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 1400px) {
    .toc-el {
        right: 2rem !important;
    }
}
</style>
