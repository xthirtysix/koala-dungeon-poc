<script setup lang="ts">
import { TeamMembersList, team } from '@/widgets/team-member'
import { TechnologiesList, technologies } from '@/widgets/technology-card'

defineOptions({
    name: 'about-page',
})
</script>

<template>
    <h1 class="kd-h1">О проекте</h1>

    <div class="space-y-8">
        <div class="prose dark:prose-invert max-w-none">
            <p>
                Koala Dungeon - это увлекательная игра, созданная командой
                энтузиастов. В игре вы сможете исследовать подземелья, сражаться
                с монстрами, собирать сокровища и развивать своего персонажа.
            </p>
        </div>

        <team-members-list title="Команда разработчиков" :members="team" />
        <technologies-list title="Технологии" :technologies="technologies" />
    </div>
</template>
