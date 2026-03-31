<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import type { SlotDrumItem } from '../model/slot-drum.types'
import {
    DRUM_WIDTH,
    ITEM_STYLES,
    VISIBLE_ITEMS,
    VELOCITY,
    SPRING_DAMPING,
    SPRING_STIFFNESS,
} from '../consts/slot-drum.consts'
import type { AuctionItem } from '@/entities/auction/model/auction.types'

const emit = defineEmits<{
    (e: 'result', index: number): void
}>()

const props = defineProps<{ items: AuctionItem[] }>()

const canvasRef = ref<HTMLCanvasElement | undefined>()
const velocity = ref(0)

const canvasHeight: number = ITEM_STYLES.HEIGHT * VISIBLE_ITEMS
let offset: number = 0
let animationId: number | undefined
let ctx: CanvasRenderingContext2D | null = null
let targetOffset = 0
let springVelocity = 0

function resetState() {
    if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = undefined
    }
    offset = 0
    targetOffset = 0
    springVelocity = 0
    velocity.value = 0
    ctx = null
}

watch(
    () => props.items.map((item) => item.title).join(','),
    () => {
        drawItems()
    },
)

const status = computed(() => {
    switch (velocity.value) {
        case VELOCITY:
            return 'spinning'
        case 0:
            return 'idle'
        default:
            return 'slowdown'
    }
})

const totalHeight = computed(() => {
    // v8 ignore start
    if (!props.items.length) return 0
    // v8 ignore stop

    return props.items?.length * ITEM_STYLES.HEIGHT
})

function drawDrum() {
    // v8 ignore start
    if (!canvasRef.value) return
    // v8 ignore stop

    let canvas

    // v8 ignore start
    if (!ctx) {
        // v8 ignore stop
        canvas = canvasRef.value
        ctx = canvasRef.value?.getContext('2d')
    }

    if (!ctx || !canvas) return

    const dpr = window.devicePixelRatio || 1

    canvas.width = DRUM_WIDTH * dpr
    canvas.style.width = `${DRUM_WIDTH}px`
    canvas.height = canvasHeight * dpr
    canvas.style.height = `${canvasHeight}px`

    ctx.scale(dpr, dpr)
}

function drawItems() {
    if (!ctx) return

    ctx.clearRect(0, 0, DRUM_WIDTH, canvasHeight)
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, DRUM_WIDTH, canvasHeight)

    const centerY = canvasHeight / 2
    const normalizedOffset =
        ((offset % totalHeight.value) + totalHeight.value) % totalHeight.value

    for (let i = -1; i <= VISIBLE_ITEMS + 1; i++) {
        const itemY =
            i * ITEM_STYLES.HEIGHT - (normalizedOffset % ITEM_STYLES.HEIGHT)
        const itemIndex =
            (Math.floor(normalizedOffset / ITEM_STYLES.HEIGHT) +
                i +
                props.items?.length) %
            props.items?.length

        const item = props.items?.[itemIndex]

        // v8 ignore start
        if (!item) continue
        const itemCenterY = itemY + ITEM_STYLES.HEIGHT / 2
        const distanceFromCenter = Math.abs(itemCenterY - centerY)
        const maxDistance = canvasHeight / 2
        const proximityFactor =
            1 - Math.min(distanceFromCenter / maxDistance, 1)
        const scale = 0.79 + 0.21 * proximityFactor
        const opacity = 0.3 + 0.7 * proximityFactor

        ctx.save()

        ctx.translate(DRUM_WIDTH / 2, itemCenterY)
        ctx.scale(scale, scale)
        ctx.translate(-DRUM_WIDTH / 2, -itemCenterY)

        ctx.fillStyle = item.color
        ctx.globalAlpha = opacity
        ctx.beginPath()
        ctx.roundRect(
            ITEM_STYLES.OFFSET,
            itemY + ITEM_STYLES.OFFSET,
            DRUM_WIDTH - ITEM_STYLES.OFFSET,
            ITEM_STYLES.HEIGHT - ITEM_STYLES.OFFSET * 2,
            ITEM_STYLES.RADIUS,
        )
        ctx.fill()
        ctx.fillStyle = ITEM_STYLES.FOREGROUND
        ctx.font = ITEM_STYLES.FONT
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1
        ctx.fillText(item.title, DRUM_WIDTH / 2, itemY + ITEM_STYLES.HEIGHT / 2)
        ctx.restore()
    }
}

function spin() {
    // v8 ignore start
    if (velocity.value) return
    // v8 ignore stop

    velocity.value = VELOCITY

    animate()
}

function stop() {
    // v8 ignore start
    if (!animationId) return
    // v8 ignore stop

    velocity.value *= 0.99
}

function animate() {
    if (velocity.value <= 1.1 && springVelocity) {
        const displacement = targetOffset - offset
        const springForce = displacement * SPRING_STIFFNESS
        springVelocity += springForce
        springVelocity *= SPRING_DAMPING
        offset += springVelocity

        if (Math.abs(displacement) < 0.5 && Math.abs(springVelocity) < 0.1) {
            offset = targetOffset
            springVelocity = 0
            velocity.value = 0

            const total = props.items.length * ITEM_STYLES.HEIGHT
            const normalizedOffset = ((offset % total) + total) % total
            const centerIndex =
                (Math.round(normalizedOffset / ITEM_STYLES.HEIGHT) + 2) %
                props.items.length

            drawItems()
            cancelAnimationFrame(animationId!)
            emit('result', centerIndex)
            animationId = undefined
            return
        }

        drawItems()
        animationId = requestAnimationFrame(animate)
        return
    }

    offset -= velocity.value

    if (velocity.value < VELOCITY) {
        velocity.value *= 0.99
    }

    if (velocity.value <= 1.1) {
        const total = props.items.length * ITEM_STYLES.HEIGHT
        const normalizedOffset = ((offset % total) + total) % total

        const currentSlot = normalizedOffset / ITEM_STYLES.HEIGHT
        const targetSlot = Math.round(currentSlot)
        const targetNormalized = targetSlot * ITEM_STYLES.HEIGHT

        const diff = targetNormalized - normalizedOffset
        targetOffset = offset + diff

        springVelocity = -velocity.value
    }

    drawItems()

    animationId = requestAnimationFrame(animate)
}

onMounted(() => {
    drawDrum()
    drawItems()
})

onUnmounted(() => {
    resetState()
})

defineExpose({
    spin,
    stop,
    status,
})
</script>

<template>
    <section
        class="drum relative mr-10 flex items-center justify-center overflow-visible rounded-2xl rounded-t-xl bg-black"
        :style="{
            height: `${canvasHeight}px`,
            width: `${canvasHeight * 1.23}px`,
        }"
    >
        <canvas ref="canvasRef" class="drum__canvas absolute" />
    </section>
</template>

<style scoped>
.drum::after {
    content: '';
    position: absolute;
    top: -20px;
    left: -27px;
    width: 740px;
    height: 460px;
    background-image: url('@/app/assets/images/slot-drum/drum2.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 10;
    pointer-events: none;
}
</style>
