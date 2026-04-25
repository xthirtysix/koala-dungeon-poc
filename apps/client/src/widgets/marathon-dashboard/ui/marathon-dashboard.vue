<script setup lang="ts">
import TileResults from './tile-results.vue'
import TileHero from './tile-hero.vue'
import TileArtefacts from './tile-artefacts.vue'
import TileSupport from './tile-support.vue'
import TileObstacles from './tile-obstacles.vue'
import TileSpirits from './tile-spirits.vue'
import winner from '@/app/assets/images/dashboard/winner.webp'
</script>

<template>
    <div
        class="grid gap-4 sm:grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_minmax(280px,1fr)] md:grid-rows-[240px_270px]"
    >
        <tile-results name="AloeKoala" :image="winner" class="md:col-span-3" />
        <tile-spirits
            :obstacleSpins="44"
            :helpSpins="21"
            :achievements="15"
            class="md:col-span-2"
        />
        <tile-artefacts class="md:col-span-2 order-last md:order-0" />
        <tile-support name="Zrun1" :count="17" class="md:col-span-1" />
        <tile-obstacles name="Zrun1" :count="25" class="md:col-span-1" />
        <tile-hero :image="winner" :count="4" class="md:col-span-1" />
    </div>
</template>
