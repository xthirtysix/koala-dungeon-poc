<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchArtefacts, type Artefact } from '@/entities/artefact'
import { heroImageByName } from '@/widgets/journal'

defineOptions({
    name: 'MarathonStatsWidget',
})

const popularArtefactNames = ['Ходули Клеопольда', 'Бокал шампусика']
const popularArtefacts = ref<Artefact[]>([])
const isLoadingArtefacts = ref(false)

const popularHeroName = 'Змеиные глазки'
const heroImage = computed(() => heroImageByName.value.get(popularHeroName))

onMounted(async () => {
    isLoadingArtefacts.value = true
    try {
        const artefacts = await fetchArtefacts.fetchByNames(popularArtefactNames)
        popularArtefacts.value = artefacts
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

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3" style="grid-template-rows: auto auto 1fr 1fr;">
            <!-- Победитель марафона - большой блок -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{ root: 'rounded-3xl bg-gradient-to-br from-yellow-100/90 to-yellow-200/90 dark:from-yellow-700/50 dark:to-yellow-600/50', body: 'p-6' }"
            >
                <div class="flex flex-col gap-2">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Победитель марафона
                    </span>
                    <span class="font-amatic text-4xl font-bold text-yellow-700 dark:text-yellow-300">
                        AloeKoala
                    </span>
                </div>
            </u-card>

            <!-- Самый популярный герой -->
            <u-card
                class="md:col-span-1 md:row-span-1 relative overflow-hidden h-full"
                :ui="{ root: 'rounded-3xl bg-stone-50/20 dark:bg-stone-900/20 h-full', body: 'p-6 relative z-10 h-full' }"
            >
                <img
                    v-if="heroImage"
                    :src="heroImage"
                    :alt="popularHeroName"
                    class="absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-10"
                />
                <div class="flex flex-col gap-2 relative z-10 h-full">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Самый популярный герой
                    </span>
                    <span class="font-amatic text-4xl font-bold text-gray-700 dark:text-gray-200">
                        Змеиные глазки (4 игры)
                    </span>
                </div>
            </u-card>

            <!-- Самые популярные артефакты -->
            <u-card
                class="md:col-span-1 md:row-span-2"
                :ui="{ root: 'rounded-3xl bg-gradient-to-br from-purple-100/90 to-purple-200/90 dark:from-purple-700/50 dark:to-purple-600/50', body: 'p-6' }"
            >
                <div class="flex flex-col gap-4">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Самые популярные артефакты
                    </span>
                    <div v-if="isLoadingArtefacts" class="flex gap-4">
                        <u-skeleton class="h-24 w-24 rounded-lg" />
                        <u-skeleton class="h-24 w-24 rounded-lg" />
                    </div>
                    <div v-else-if="popularArtefacts.length > 0" class="flex gap-4">
                        <div
                            v-for="artefact in popularArtefacts"
                            :key="artefact.id"
                            class="flex flex-col items-center gap-2"
                        >
                            <div class="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-white/50 dark:bg-gray-800/50">
                                <img
                                    v-if="artefact.image?.url"
                                    :src="artefact.image.url"
                                    :alt="artefact.name"
                                    class="h-full w-full object-contain p-2"
                                />
                                <u-skeleton v-else class="h-full w-full" />
                            </div>
                            <span class="font-amatic text-lg font-bold text-purple-700 dark:text-purple-300 text-center">
                                {{ artefact.name }}
                            </span>
                        </div>
                    </div>
                    <div v-else class="flex flex-col gap-1">
                        <span class="font-amatic text-2xl font-bold text-purple-700 dark:text-purple-300">
                            Ходули Клеопольда
                        </span>
                        <span class="font-amatic text-2xl font-bold text-purple-700 dark:text-purple-300">
                            Бокал шампусика
                        </span>
                    </div>
                </div>
            </u-card>

            <!-- Лучший в помощи -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{ root: 'rounded-3xl bg-gradient-to-br from-green-100/90 to-green-200/90 dark:from-green-700/50 dark:to-green-600/50', body: 'p-6' }"
            >
                <div class="flex flex-col gap-2">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Лучший в помощи
                    </span>
                    <span class="font-amatic text-4xl font-bold text-green-700 dark:text-green-300">
                        Zrun1
                    </span>
                </div>
            </u-card>

            <!-- Лучший в помехах -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{ root: 'rounded-3xl bg-gradient-to-br from-red-100/90 to-red-200/90 dark:from-red-700/50 dark:to-red-600/50', body: 'p-6' }"
            >
                <div class="flex flex-col gap-2">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Лучший в помехах
                    </span>
                    <span class="font-amatic text-4xl font-bold text-red-700 dark:text-red-300">
                        Zrun1
                    </span>
                </div>
            </u-card>

            <!-- Количество помех -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{ root: 'rounded-3xl bg-gradient-to-br from-orange-100/90 to-orange-200/90 dark:from-orange-700/50 dark:to-orange-600/50', body: 'p-6' }"
            >
                <div class="flex flex-col gap-2">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Количество помех
                    </span>
                    <span class="font-amatic text-4xl font-bold text-orange-700 dark:text-orange-300">
                        44
                    </span>
                </div>
            </u-card>

            <!-- Количество помощи -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{ root: 'rounded-3xl bg-gradient-to-br from-emerald-100/90 to-emerald-200/90 dark:from-emerald-700/50 dark:to-emerald-600/50', body: 'p-6' }"
            >
                <div class="flex flex-col gap-2">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Количество помощи
                    </span>
                    <span class="font-amatic text-4xl font-bold text-emerald-700 dark:text-emerald-300">
                        21
                    </span>
                </div>
            </u-card>

            <!-- Ачивок собрано духами -->
            <u-card
                class="md:col-span-1 md:row-span-1"
                :ui="{ root: 'rounded-3xl bg-gradient-to-br from-indigo-100/90 to-indigo-200/90 dark:from-indigo-700/50 dark:to-indigo-600/50', body: 'p-6' }"
            >
                <div class="flex flex-col gap-2">
                    <span class="font-amatic text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Ачивок собрано духами
                    </span>
                    <span class="font-amatic text-4xl font-bold text-indigo-700 dark:text-indigo-300">
                        15
                    </span>
                </div>
            </u-card>
        </div>
    </div>
</template>

<style scoped></style>

