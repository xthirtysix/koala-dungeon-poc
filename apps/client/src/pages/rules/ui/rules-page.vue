<script setup lang="ts">
import { TableOfContents } from '@/widgets/table-of-contents'
// import { rules } from '@/pages/rules'
import { onBeforeMount, ref } from 'vue'
// Import package exports
import MDCRenderer from '@nuxtjs/mdc/runtime/components/MDCRenderer.vue'
import type { MDCParserResult } from '@nuxtjs/mdc'
import useMarkdownParser from '@/shared/composables/useMarkdownParser'
import rulesApi from '@/entities/rules/api/rules'

defineOptions({
    name: 'rules-page',
})

const md = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

const ast = ref<MDCParserResult | null>(null)
const parse = useMarkdownParser()

onBeforeMount(async () => {
    try {
        const rules = await rulesApi.fetchRules()
        md.value = rules[0]?.rules || ''
        ast.value = await parse(md.value)
    } catch (e) {
        error.value = 'Ошибка загрузки правил'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <h1 class="kd-h1 hidden">Правила марафона</h1>
    <div v-if="loading" class="font-amatic py-8 text-center text-4xl font-bold">
        Загрузка...
    </div>
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
