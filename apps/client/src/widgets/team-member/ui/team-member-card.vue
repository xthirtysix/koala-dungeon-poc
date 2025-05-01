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
        <u-card class="py-0.5 px-1">
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="font-medium">
                        {{ member.name }}
                    </h3>
                    <u-icon
                        name="i-simple-icons-twitch"
                        class="text-[#9146FF] text-sm"
                    />
                </div>
                <p class="text-gray-500 text-sm">
                    {{ member.role }}
                </p>
            </div>
        </u-card>
    </a>
</template>
