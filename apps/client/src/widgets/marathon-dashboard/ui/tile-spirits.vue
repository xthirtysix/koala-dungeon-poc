<script setup lang="ts">
import DashboardTile from './dashboard-tile.vue'

defineProps<{
    obstacleSpins: number
    helpSpins: number
    achievements: number
}>()
</script>

<template>
    <dashboard-tile
        :ui="{
            root: 'grid grid-rows-[auto_1fr]',
            body: 'flex h-auto my-auto',
        }"
    >
        <template #header>
            <p class="">Действия духов</p>
        </template>

        <dl
            class="stats divide-accented grid grid-cols-3 content-start justify-center gap-4"
        >
            <dt class="stats__term stats__term--a">
                <div
                    class="bg-accented flex size-12 items-center justify-center rounded-full"
                    role="presentation"
                >
                    <u-icon name="ph:bomb-duotone" class="size-8" />
                </div>
                <p class="truncate w-full">Помех создано</p>
            </dt>
            <dd class="stats__desc font-amatic text-3xl font-bold">
                {{ obstacleSpins }}
            </dd>
            <dt class="stats__term stats__term--b">
                <div
                    class="bg-accented flex size-12 items-center justify-center rounded-full"
                    role="presentation"
                >
                    <u-icon name="ph:hand-heart-duotone" class="size-8" />
                </div>
                <p class="truncate w-full">Помощи оказано</p>
            </dt>
            <dd class="stats__desc font-amatic text-3xl font-bold">
                {{ helpSpins }}
            </dd>
            <dt class="stats__term stats__term--c">
                <div
                    class="bg-accented flex size-12 items-center justify-center rounded-full"
                    role="presentation"
                >
                    <u-icon
                        name="ph:medal-duotone"
                        class="size-8 text-center"
                    />
                </div>
                <p class="truncate w-full">Ачивок заработано</p>
            </dt>
            <dd class="stats__desc font-amatic text-3xl font-bold">
                {{ achievements }}
            </dd>
        </dl>
    </dashboard-tile>
</template>

<style scoped>
.stats {
    grid-template-areas:
        'term-a term-b term-c'
        'desc-a desc-b desc-c';
}
.stats__term,
.stats__desc {
    display: grid;
    justify-items: center;
    gap: 0.5rem;
    text-align: center;
}
.stats__term--a {
    grid-area: term-a;
}
.stats__term--b {
    grid-area: term-b;
}
.stats__term--c {
    grid-area: term-c;
}
</style>
