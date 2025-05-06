<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import marathonApi from '@/entities/marathon/api/marathon'
import type { Marathon } from '@/entities/marathon'

const marathon = ref<Marathon | null>(null)
const loading = ref(true)
const now = ref(Date.now())
let timer: number | null = null

const fetchData = async () => {
    loading.value = true
    marathon.value = await marathonApi.fetchMarathon()
    loading.value = false
}

onMounted(() => {
    fetchData()
    timer = window.setInterval(() => {
        now.value = Date.now()
    }, 1000)
})

// Очищаем таймер при размонтировании
onUnmounted(() => {
    if (timer) clearInterval(timer)
})

const startTime = computed(() =>
    marathon.value ? new Date(marathon.value.startTime).getTime() : 0,
)
const totalTime = computed(() => marathon.value?.totalTime ?? 0)
const passedTime = computed(() => marathon.value?.passedTime ?? 0)
const isPaused = computed(() => marathon.value?.isPaused ?? false)
const timeLeft = computed(() => {
    if (!marathon.value) return 0
    const elapsed = Math.max(
        0,
        Math.floor((now.value - startTime.value) / 1000),
    )
    return Math.max(
        0,
        totalTime.value -
            (isPaused.value ? passedTime.value : passedTime.value + elapsed),
    )
})

function formatTime(sec: number) {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

const status = computed(() => {
    if (!marathon.value) return ''
    const nowSec = Math.floor(now.value / 1000)
    const startSec = Math.floor(startTime.value / 1000)
    const isBeforeStart = nowSec < startSec
    const isAfterStart = nowSec >= startSec
    const pt = passedTime.value
    const tt = totalTime.value
    // 1. До старта, нет passedTime
    if (isBeforeStart && !pt) {
        return `Марафон начнется ${new Date(marathon.value.startTime).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'long' })} (но это не точно)`
    }
    // 2. После старта, на паузе
    if (isAfterStart && isPaused.value && !pt && !isBeforeStart) {
        return 'Мы задерживаемся, но вот-вот начнем!'
    }
    // 3. После старта, не на паузе
    if (isAfterStart && !isPaused.value && pt !== tt) {
        if (timeLeft.value > 0) {
            return '' // Показываем таймер
        } else {
            return 'Марафон закончен! Но скоро нас ждут новые приключения!'
        }
    }
    // 4. paused, passedTime есть, startTime >= now
    if (pt !== tt && pt && isPaused.value && isBeforeStart) {
        return `Марафон продолжится ${new Date(marathon.value.startTime).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'long' })}`
    }
    // 5. paused, passedTime есть, startTime < now
    if (pt !== tt && pt && isPaused.value && isAfterStart) {
        return 'Марафон скоро продолжится. Следите за обновлениями'
    }
    // 6. Закончен
    if (pt === tt) {
        return 'Марафон закончен! Но скоро нас ждут новые приключения!'
    }
    return ''
})
</script>

<template>
    <div
        class="font-amatic mx-auto mt-6 w-full rounded-lg bg-white p-6 text-center text-3xl font-bold shadow dark:bg-gray-800"
    >
        <div class="flex flex-col items-center gap-4 py-6">
            <div
                v-if="loading"
                class="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
            />
            <template v-else>
                <div v-if="status">
                    <span class="text-center">{{ status }}</span>
                </div>
                <div v-else>
                    <span class="text-primary text-4xl">До конца марафона {{ formatTime(timeLeft) }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped></style>
