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
        <u-card class="px-1 py-0.5">
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="text-xl font-bold">
                        {{ member.name }}
                    </h3>
                    <u-icon
                        name="i-simple-icons:twitch"
                        class="text-sm text-[#9146FF]"
                    />
                </div>
                <p class="text-sm text-gray-500">
                    {{ member.role }}
                </p>
            </div>
        </u-card>
    </a>
</template>
