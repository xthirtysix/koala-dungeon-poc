<script setup lang="ts">
import { TeamMemberCard, type TeamMember } from '@/widgets/team-member'

defineProps<{
    title: string
    members: TeamMember[]
}>()
</script>

<template>
    <h2 class="kd-h2">{{ title }}</h2>

    <ul class="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <li v-for="member in members" :key="member.name">
            <team-member-card :member="member" />
        </li>
    </ul>
</template>
