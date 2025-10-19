<script setup lang="ts">
import { onMounted } from 'vue'
import { useRolls } from '@/features/dice'
import { Dice, DiceIcon } from '@/entities/dice'

const { rolls, isLoading, error, loadRolls } = useRolls()

// Загружаем первую страницу бросков при монтировании компонента
onMounted(async () => {
    try {
        await loadRolls({
            page: 1,
            pageSize: 20,
            sort: 'date:desc',
        })
    } catch (err) {
        console.error('Ошибка при загрузке бросков:', err)
    }
})

const formatTimestamp = (timestamp: number) => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(timestamp))
}

const getDiceIcon = (dice: number) => {
    return DiceIcon[`D${dice}` as keyof typeof DiceIcon] || '🎲'
}

const getDiceName = (dice: number) => {
    return Dice[dice] || `d${dice}`
}

const getDiceIconBgColor = (roll: any) => {
    if (roll.isAdvantage) return 'bg-green-100/40 dark:bg-green-300/40'
    if (roll.isDisadvantage) return 'bg-red-100/40 dark:bg-red-300/40'

    return 'bg-blue-100/40 dark:bg-blue-300/40'
}

const getRemainingRoll = (roll: any) => {
    const maxDie = Math.max(...Object.keys(roll.pool || {}).map(Number))
    const values = (roll.pool && roll.pool[maxDie]) || []

    if (!Array.isArray(values) || values.length < 2) return null

    if (roll.isAdvantage) {
        return Math.min(...values)
    }

    if (roll.isDisadvantage) {
        return Math.max(...values)
    }

    return null
}
</script>

<template>
    <section class="rolls-journal">
        <h3 class="sr-only">Журнал бросков</h3>

        <!-- Индикатор загрузки -->
        <div v-if="isLoading && rolls.length === 0" class="py-12 text-center">
            <div class="mb-4 text-6xl">⏳</div>
            <p class="font-amatic text-2xl font-bold text-gray-500">
                Загрузка бросков...
            </p>
        </div>

        <!-- Сообщение об ошибке -->
        <div v-else-if="error" class="py-12 text-center">
            <div class="mb-4 text-6xl">❌</div>
            <p class="font-amatic text-2xl font-bold text-red-500">
                {{ error }}
            </p>
        </div>

        <!-- Пустой журнал -->
        <figure v-else-if="rolls.length === 0" class="py-12 text-center">
            <span class="mb-4 text-6xl">📔</span>
            <figcaption class="font-amatic text-2xl font-bold text-gray-500">
                Журнал бросков пуст
            </figcaption>
        </figure>

        <transition-group name="roll-item" tag="ul" class="space-y-2">
            <li v-for="roll in rolls" :key="roll.id">
                <u-card
                    :ui="{
                        root: 'relative overflow-hidden rounded-2xl bg-stone-50/20 p-0 shadow-sm duration-200 hover:shadow-md',
                        body: 'flex items-start gap-2 p-2 sm:p-2 sm:pr-4',
                    }"
                >
                    <u-icon
                        class="relative z-1 flex h-12 w-12 items-center justify-center rounded-xl p-1.5 text-xl shadow-inner"
                        :class="getDiceIconBgColor(roll.rollResult)"
                        :name="
                            getDiceIcon(
                                Math.max(
                                    ...Object.keys(roll.rollResult.pool).map(
                                        Number,
                                    ),
                                ),
                            )
                        "
                    />

                    <div class="min-w-0">
                        <p
                            class="min-w-0 pb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            {{
                                getDiceName(
                                    Math.max(
                                        ...Object.keys(
                                            roll.rollResult.pool,
                                        ).map(Number),
                                    ),
                                )
                            }}
                        </p>
                        <time
                            :datetime="new Date(roll.timestamp).toISOString()"
                            class="text-xs text-gray-400 dark:text-gray-500"
                        >
                            {{ formatTimestamp(roll.timestamp) }}
                        </time>
                    </div>

                    <div
                        class="ml-auto grid justify-end self-center text-right leading-tight"
                    >
                        <span
                            class="text-xl font-bold text-gray-900 sm:text-xl dark:text-gray-100"
                        >
                            {{ roll.rollResult.result }}
                        </span>
                        <span
                            v-if="getRemainingRoll(roll.rollResult)"
                            class="text-sm text-gray-500 dark:text-gray-400"
                        >
                            {{ getRemainingRoll(roll.rollResult) }}
                        </span>
                    </div>
                </u-card>
            </li>
        </transition-group>
    </section>
</template>

<style scoped>
.roll-item-enter-active {
    transition: all 0.4s ease-out;
}

.roll-item-leave-active {
    transition: all 0.3s ease-in;
}

.roll-item-enter-from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

.roll-item-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

.roll-item-move {
    transition: transform 0.3s ease;
}
</style>
