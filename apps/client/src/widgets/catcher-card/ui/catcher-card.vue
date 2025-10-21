<script setup lang="ts">
import type { Catcher } from '@/entities/catcher/model/types'

interface Props {
    catcher: Catcher
}

defineProps<Props>()
</script>

<template>
    <u-card :ui="{ root: 'rounded-3xl p-0 relative bg-stone-50/20' }">
        <dl class="flex items-center gap-6">
            <dt class="sr-only">Имя:</dt>
            <dd class="inline-flex items-center justify-center gap-2">
                <u-icon
                    name="i-simple-icons:twitch"
                    class="size-5 text-violet-500"
                />
                <span class="font-amatic text-2xl font-bold">
                    {{ catcher.nickname }}
                </span>
            </dd>
            <dt class="sr-only">Battle Tag:</dt>
            <dd class="mr-auto inline-flex items-center gap-2">
                <u-icon
                    name="i-simple-icons:battledotnet"
                    class="size-5 text-blue-500"
                />
                <span class="font-amatic text-2xl font-bold">{{
                    catcher.battle_tag
                }}</span>
            </dd>
            <div class="flex items-center gap-2">
                <dt class="font-amatic text-3xl font-bold lowercase">Очки:</dt>
                <dd class="font-amatic text-3xl font-bold">
                    {{ catcher.score }}
                </dd>
            </div>
        </dl>
        <div
            class="kd-gradient pointer-events-none absolute top-0 left-0 h-4 w-full rounded-lg opacity-15"
        />
    </u-card>
</template>
