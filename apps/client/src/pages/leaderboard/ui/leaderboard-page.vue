<script setup lang="ts">
import { computed } from 'vue'
import { LeaderCard } from '@/widgets/leader-card'
import { HeroList } from '@/widgets/hero-list'
import { heroes, type Hero } from '@/entities/hero'

const sortedHeroes = computed(() => {
    return heroes.toSorted((a, b) => b.totalDonations - a.totalDonations)
})

const topHeroes = computed<Hero[]>(() => {
    return sortedHeroes.value.slice(0, 3)
})

const getHeroCardProps = (hero: Hero, index: number) => ({
    place: index + 1,
    name: hero.name,
    interferenceWheelSpins: hero.interferenceWheelSpins,
    helpWheelSpins: hero.helpWheelSpins,
    deferredInterferences: hero.deferredInterferences,
    totalDonations: hero.totalDonations,
    achievements: hero.achievements,
    rerolls: hero.rerolls
})
</script>

<template>
    <u-container>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 py-8">
            <leader-card
                v-for="(hero, index) in topHeroes"
                :key="hero.name"
                v-bind="getHeroCardProps(hero, index)"
            />
        </div>
        <hero-list :heroes="sortedHeroes" />
    </u-container>
</template>
