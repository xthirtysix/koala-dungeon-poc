<script lang="ts" setup>
import type { TeamMember } from '@/widgets/team-member'

defineProps<{
    member: TeamMember
}>()

defineOptions({
    name: 'TeamMemberCard',
})
</script>

<template>
    <a
        :href="member.twitch ? `https://twitch.tv/${member.twitch}` : undefined"
        target="_blank"
        class="block"
    >
        <u-card
            class="rounded-xl"
            :ui="{
                body: 'p-4 sm:p-4 grid grid-cols-[auto_1fr] items-baseline gap-2',
            }"
        >
            <h3 class="flex text-xl font-bold">
                {{ member.name }}
            </h3>

            <u-icon
                name="i-simple-icons:twitch"
                class="text-sm text-violet-500"
            />

            <p class="col-span-full text-sm">
                {{ member.role }}
            </p>
        </u-card>
    </a>
</template>
