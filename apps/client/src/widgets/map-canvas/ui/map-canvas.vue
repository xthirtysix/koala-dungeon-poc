<script setup lang="ts">
import {
    ref,
    onMounted,
    onUnmounted,
    nextTick,
    computed,
    WatchStopHandle,
    watch,
} from 'vue'
import { HeroToken } from '@/entities/token'
import { useMapStore } from '@/entities/map'
import { MapPath, pathMock } from '@/widgets/path'
import { useCharacter } from '@/entities/character'
import { storeToRefs } from 'pinia'
import mapBackgroundImage from '@/app/assets/images/map_autumn_25.webp'
import { useMapMovement } from '@/features/token'
const mapBackground = mapBackgroundImage

const DEV_MODE = false

const pathPoints = ref([...pathMock])
const mapImg = ref<HTMLImageElement | null>(null)
const mapContainer = ref<HTMLDivElement | null>(null)
const imageNaturalWidth = ref<number>(0)
const imageNaturalHeight = ref<number>(0)
const imageDisplayWidth = ref<number>(0)
const imageDisplayHeight = ref<number>(0)
const imageOffsetX = ref<number>(0)
const imageOffsetY = ref<number>(0)
const scrollTop = ref<number>(0)
const token = ref<InstanceType<typeof HeroToken> | null>(null)
const isImageLoaded = ref<boolean>(false)

const { tokenCell: currentCellIndex } = storeToRefs(useMapStore())

const { walk } = useMapMovement({ path: pathPoints.value })

const emit = defineEmits<{
    (e: 'cell-click'): void
    (e: 'map-ready'): void
}>()

const mapStore = useMapStore()
const { clearMoveInterval } = mapStore

let resizeHandler: WatchStopHandle | null = null

function handleMapClick(e: MouseEvent) {
    if (!DEV_MODE || !mapImg.value || !mapContainer.value) return
    updateImageMetrics()
    const imgRect = mapImg.value.getBoundingClientRect()
    const x = e.clientX - imgRect.left
    const y = e.clientY - imgRect.top
    const percentX = +(x / imgRect.width).toFixed(4)
    const percentY = +(y / imgRect.height).toFixed(4)
    console.debug(
        `Координаты: x=${x}, y=${y} (отн: x=${percentX}, y=${percentY})`,
    )
    pathPoints.value.push({ x: percentX, y: percentY })
    console.debug(pathPoints.value)
}

function updateImageMetrics() {
    if (!mapImg.value || !mapContainer.value) return
    imageNaturalWidth.value = mapImg.value.naturalWidth
    imageNaturalHeight.value = mapImg.value.naturalHeight
    const containerRect = mapContainer.value.getBoundingClientRect()
    const imgRect = mapImg.value.getBoundingClientRect()
    imageDisplayWidth.value = imgRect.width
    imageDisplayHeight.value = imgRect.height
    imageOffsetX.value = imgRect.left - containerRect.left
    imageOffsetY.value = Math.max(imgRect.top - containerRect.top, 0)
    scrollTop.value = mapContainer.value.scrollTop
}

function handleScroll() {
    if (!mapContainer.value) return
    scrollTop.value = mapContainer.value.scrollTop
}

function handleCellClick(payload: { cellNumber: number }) {
    mapStore.currentCell = payload.cellNumber
    emit('cell-click')
}

const pointsPx = computed(() => {
    return pathPoints.value.map((p) => ({
        ...p,
        x: p.x * imageDisplayWidth.value,
        y: p.y * imageDisplayHeight.value,
    }))
})

function cleanup() {
    clearMoveInterval()
    if (mapContainer.value) {
        mapContainer.value.removeEventListener('scroll', handleScroll)
    }
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler)
        resizeHandler = null
    }
}

function focusToken() {
    token.value?.$el?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
    })
}

const { data: character } = useCharacter()

watch(
    () => character.value?.map_placement,
    async (
        newMapPlacement: number | null | undefined,
        oldMapPlacement: number | null | undefined,
    ) => {
        if (!oldMapPlacement && newMapPlacement) {
            currentCellIndex.value = newMapPlacement - 1
            /**
             * 🩼 анимация должна происходить после перемещения токена на новую ячейку
             */
            setTimeout(() => {
                focusToken()
            }, 500)
        }

        if (newMapPlacement !== undefined && newMapPlacement !== null) {
            await walk(newMapPlacement - 1)
        }
    },
    { immediate: true },
)

onMounted(async () => {
    const img = new Image()
    img.src = mapBackground
    img.onload = async () => {
        isImageLoaded.value = true
        emit('map-ready')
        await nextTick()
        updateImageMetrics()
    }
    img.onerror = () => {
        isImageLoaded.value = true
        emit('map-ready')
    }

    await nextTick()
    updateImageMetrics()

    if (mapImg.value) {
        mapImg.value.onload = updateImageMetrics
    }
    if (mapContainer.value) {
        mapContainer.value.addEventListener('scroll', handleScroll)
    }

    resizeHandler = () => {
        nextTick(() => {
            updateImageMetrics()
        })
    }
    window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
    cleanup()
})

defineExpose({
    focusToken,
    updateImageMetrics,
})
</script>

<template>
    <div
        v-if="isImageLoaded"
        ref="mapContainer"
        class="relative h-full w-full rounded-lg"
        @scroll="handleScroll"
    >
        <div
            v-if="imageDisplayWidth && imageDisplayHeight"
            class="absolute z-20"
            :style="{
                left: `${imageOffsetX}px`,
                top: `${imageOffsetY}px`,
                width: `${imageDisplayWidth}px`,
                height: `${imageDisplayHeight}px`,
                pointerEvents: DEV_MODE ? 'none' : 'auto',
            }"
        >
            <hero-token
                ref="token"
                :current-cell="pointsPx[currentCellIndex]"
                player-name="AloeKoala"
            />
            <map-path
                :path="mapStore.enrichedCells"
                :width="imageDisplayWidth"
                :height="imageDisplayHeight"
                :stroke-width="10"
                @cell-click="handleCellClick"
            />
        </div>

        <img
            ref="mapImg"
            :src="mapBackground"
            alt="Карта Подземелья"
            class="pointer-events-auto absolute z-10 block w-full cursor-crosshair object-contain brightness-80 select-none"
            draggable="false"
            @click="handleMapClick"
        />
    </div>
    <u-skeleton v-else class="h-full w-full rounded-xl" />
</template>
