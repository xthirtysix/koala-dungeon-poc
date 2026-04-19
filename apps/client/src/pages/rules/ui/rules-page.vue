<script setup lang="ts">
import { watch, ref } from 'vue'
import type { MDCParserResult } from '@nuxtjs/mdc'
import MDCRenderer from '@nuxtjs/mdc/runtime/components/MDCRenderer.vue'
import { useQuery } from '@tanstack/vue-query'
import { TableOfContents } from '@/widgets/table-of-contents'
import { useMarkdownParser } from '@/shared/composables'
import { useMarathonRules } from '../api/rules-page.loader'
import { rulesPageQueryOptions } from '../api/rules-page.query'
import RulesPageSkeleton from './rules-page-skeleton.vue'

defineOptions({
    name: 'rules-page',
})

useMarathonRules()

const { data: rules, isLoading, error } = useQuery(rulesPageQueryOptions())

const isParsing = ref(true)

const md = ref('')

const ast = ref<MDCParserResult | null>(null)
const parse = useMarkdownParser()

watch(
    rules,
    async () => {
        try {
            md.value = rules.value?.data[0]?.rules || ''
            ast.value = await parse(md.value)
        } finally {
            isParsing.value = false
        }
    },
    { immediate: true },
)
</script>

<template>
    <h1 class="kd-h1 hidden">Правила марафона</h1>
    <rules-page-skeleton v-if="isLoading || isParsing" />
    <div v-else-if="error" class="py-8 text-red-500">{{ error }}</div>
    <div v-else class="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
        <suspense>
            <m-d-c-renderer
                v-if="ast?.body"
                :body="ast.body"
                :data="ast.data"
                class="prose dark:prose-invert max-w-full"
            />
        </suspense>
        <div
            v-if="ast?.toc?.links"
            class="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]"
        >
            <div class="hidden lg:block">
                <table-of-contents
                    :links="ast?.toc?.links"
                    title="На этой странице"
                    class="toc-el fixed mt-0 hidden overflow-y-auto pr-4 lg:block"
                />
            </div>
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
