<script setup lang="ts">
import { TeamMemberCard, type TeamMember } from '@/widgets/team-member'

defineProps<{
    title: string
    members: TeamMember[]
}>()
</script>

<template>
    <h2 class="text-2xl font-semibold mb-4">{{ title }}</h2>

    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        <li v-for="member in members" :key="member.name">
            <team-member-card :member="member" />
        </li>
    </ul>
</template>
