<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { artefactsApi, type ArtefactPreview } from '@/entities/artefact'
import { heroImageByName } from '@/widgets/journal'

defineOptions({
    name: 'MarathonStatsWidget',
})

const popularArtefactNames = ['Бокал шампусика', 'Ходули Клеопольда']
const popularArtefacts = ref<ArtefactPreview[]>([])
const isLoadingArtefacts = ref(false)

const popularHeroName = 'Змеиные глазки'
const heroImage = computed(() => heroImageByName.value.get(popularHeroName))

onMounted(async () => {
    isLoadingArtefacts.value = true
    try {
        const { data } =
            await artefactsApi.getByNames(popularArtefactNames)
        popularArtefacts.value = data
    } catch (error) {
        console.error('Ошибка загрузки популярных артефактов:', error)
    } finally {
        isLoadingArtefacts.value = false
    }
})
</script>

<template>
    <div>
        <h2 class="kd-h2 mb-4">Результаты марафона "Осень 2025"</h2>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <!-- Победитель марафона - большой блок -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{
                    root: 'rounded-xl ring-1 ring-yellow-300 dark:ring-yellow-400/60 bg-yellow-300/90 dark:bg-yelow-600/80',
                    body: 'p-6',
                }"
            >
                <div class="flex flex-col gap-2">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Победитель марафона
                    </span>
                    <span
                        class="font-amatic text-4xl font-bold text-yellow-800"
                    >
                        AloeKoala
                    </span>
                </div>
            </u-card>

            <!-- Самый популярный герой -->
            <u-card
                class="relative h-full overflow-hidden md:col-span-1 md:row-span-1"
                :ui="{
                    root: 'rounded-xl h-full ring-1 ring-zinc-300 dark:ring-zinc-400/60 bg-zinc-300/90 dark:bg-zinc-600/80',
                    body: 'p-6 relative z-10 h-full',
                }"
            >
                <img
                    v-if="heroImage"
                    :src="heroImage"
                    :alt="popularHeroName"
                    class="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
                />
                <div class="relative z-10 flex h-full flex-col gap-2">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Самый популярный герой
                    </span>
                    <span
                        class="font-amatic text-4xl font-bold text-gray-800 dark:text-gray-200"
                    >
                        Змеиные глазки (4 игры)
                    </span>
                </div>
            </u-card>

            <!-- Самые популярные артефакты -->
            <u-card
                class="md:col-span-1 md:row-span-2"
                :ui="{
                    root: 'rounded-xl h-full ring-1 ring-violet-300 dark:ring-violet-400/60 bg-violet-300/90 dark:bg-violet-600/80',
                    body: 'p-6',
                }"
            >
                <div class="flex flex-col gap-4">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Самые популярные артефакты
                    </span>
                    <div v-if="isLoadingArtefacts" class="flex gap-4">
                        <u-skeleton class="h-24 w-24 rounded-md" />
                        <u-skeleton class="h-24 w-24 rounded-md" />
                    </div>
                    <div
                        v-else-if="popularArtefacts.length > 0"
                        class="flex gap-4"
                    >
                        <div
                            v-for="artefact in popularArtefacts"
                            :key="artefact.id"
                            class="flex flex-col items-center gap-2"
                        >
                            <div
                                class="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-md bg-white/60 dark:bg-gray-900/35"
                            >
                                <img
                                    v-if="artefact.image?.url"
                                    :src="artefact.image.url"
                                    :alt="artefact.name"
                                    class="h-full w-full object-contain p-2"
                                />
                                <u-skeleton v-else class="h-full w-full" />
                            </div>
                            <span
                                class="font-amatic text-center text-lg font-bold text-violet-800 dark:text-violet-200"
                            >
                                {{ artefact.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </u-card>

            <!-- Лучший в помощи -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{
                    root: 'rounded-xl h-full ring-1 ring-green-300 dark:ring-green-400/60 bg-green-300/90 dark:bg-green-600/80',
                    body: 'p-6',
                }"
            >
                <div class="flex flex-col gap-2">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Лучший в помощи
                    </span>
                    <span
                        class="font-amatic text-4xl font-bold text-green-800 dark:text-green-200"
                    >
                        Zrun1
                    </span>
                </div>
            </u-card>

            <!-- Лучший в помехах -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{
                    root: 'rounded-xl h-full ring-1 ring-red-300 dark:ring-red-400/60 bg-red-300/90 dark:bg-red-600/80',
                    body: 'p-6',
                }"
            >
                <div class="flex flex-col gap-2">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Лучший в помехах
                    </span>
                    <span
                        class="font-amatic text-4xl font-bold text-red-800 dark:text-red-200"
                    >
                        Zrun1
                    </span>
                </div>
            </u-card>

            <!-- Количество помех -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{
                    root: 'rounded-xl h-full ring-1 ring-orange-300 dark:ring-orange-300/60 bg-orange-300/90 dark:bg-orange-600/80',
                    body: 'p-6',
                }"
            >
                <div class="flex flex-col gap-2">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Количество помех
                    </span>
                    <span
                        class="font-amatic text-4xl font-bold text-orange-800 dark:text-orange-200"
                    >
                        44
                    </span>
                </div>
            </u-card>

            <!-- Количество помощи -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{
                    root: 'rounded-xl h-full ring-1 ring-blue-300 dark:ring-blue-400/60 bg-blue-300/90 dark:bg-blue-600/80',
                    body: 'p-6',
                }"
            >
                <div class="flex flex-col gap-2">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Количество помощи
                    </span>
                    <span
                        class="font-amatic text-4xl font-bold text-blue-800 dark:text-blue-200"
                    >
                        21
                    </span>
                </div>
            </u-card>

            <!-- Ачивок собрано духами -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{
                    root: 'rounded-xl h-full ring-1 ring-lime-300 dark:ring-lime-400/60 bg-lime-300/90 dark:bg-lime-600/80',
                    body: 'p-6',
                }"
            >
                <div class="flex flex-col gap-2">
                    <span
                        class="font-amatic text-main dark:text-inverted text-2xl font-bold"
                    >
                        Ачивок собрано духами
                    </span>
                    <span
                        class="font-amatic text-4xl font-bold text-lime-800 dark:text-lime-200"
                    >
                        15
                    </span>
                </div>
            </u-card>
        </div>
    </div>
</template>

<style scoped></style>
