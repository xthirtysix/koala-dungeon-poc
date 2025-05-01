<script setup lang="ts">
defineOptions({
    name: 'home-page',
})
</script>

<template>
    <div class="home-page">
        <div class="sidebar-content">
            <u-card>
                <template #header>
                    <h3 class="text-lg font-semibold">Меню игры</h3>
                </template>
            </u-card>

            <u-card class="mt-4">
                <template #header>
                    <h3 class="text-lg font-semibold">Статистика</h3>
                </template>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>Уровень:</span>
                        <span class="font-semibold">1</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Опыт:</span>
                        <span class="font-semibold">0/100</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Золото:</span>
                        <span class="font-semibold">0</span>
                    </div>
                </div>
            </u-card>
        </div>

        <div class="page-content">
            <u-card>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h1 class="text-2xl font-bold">
                            Добро пожаловать в Koala Dungeon
                        </h1>
                        <u-button color="primary" variant="solid" icon="i-heroicons-play" label="Начать игру" />
                    </div>
                </template>

                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <u-card>
                            <template #header>
                                <h3 class="text-lg font-semibold">
                                    Последние достижения
                                </h3>
                            </template>
                            <div class="space-y-2">
                                <p class="text-gray-500">
                                    У вас пока нет достижений
                                </p>
                                <u-button color="gray" variant="ghost" label="Посмотреть все" to="/achievements" />
                            </div>
                        </u-card>

                        <u-card>
                            <template #header>
                                <h3 class="text-lg font-semibold">
                                    Топ игроков
                                </h3>
                            </template>
                            <div class="space-y-2">
                                <p class="text-gray-500">
                                    Таблица лидеров пока пуста
                                </p>
                                <u-button color="gray" variant="ghost" label="Обновить" />
                            </div>
                        </u-card>
                    </div>

                    <u-card>
                        <template #header>
                            <h3 class="text-lg font-semibold">Новости</h3>
                        </template>
                        <div class="space-y-4">
                            <div class="flex items-start gap-4">
                                <u-icon name="i-heroicons-newspaper" class="text-primary text-xl" />
                                <div>
                                    <h4 class="font-medium">
                                        Добро пожаловать в игру!
                                    </h4>
                                    <p class="text-gray-500 text-sm">
                                        Мы рады приветствовать вас в мире Koala
                                        Dungeon. Начните свое приключение прямо
                                        сейчас!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </u-card>
                </div>
            </u-card>
        </div>
    </div>
</template>

<style scoped>
.home-page {
    display: flex;
    gap: 1rem;
}

.sidebar-content {
    width: 300px;
    padding: 1rem;
}

.page-content {
    flex: 1;
    padding: 1rem;
}
</style>

