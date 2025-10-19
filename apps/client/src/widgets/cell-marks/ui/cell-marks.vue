<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapMarks } from '@/entities/map'
import { useUserStore } from '@/entities/user'
import { MARKS } from '../consts/marks'

defineProps<{ cellNumber?: number }>()

const { markCell, unmarkCell, markedCells } = useMapMarks()
const { user } = storeToRefs(useUserStore())

const open = ref<boolean>(false)

const handleMarkClick = async (cellNumber: number, emoji: string) => {
    open.value = false
    if (cellNumber) {
        await markCell(cellNumber, emoji)
    }
}
</script>

<template>
    <u-popover
        v-model:open="open"
        v-if="user && cellNumber !== undefined"
        :arrow="true"
        :ui="{ content: 'rounded-4xl' }"
        :content="{ align: 'center', side: 'top', sideOffset: 8 }"
    >
        <template #default>
            <u-button
                :icon="
                    markedCells.get(cellNumber) ? undefined : 'i-lucide-plus'
                "
                color="neutral"
                variant="solid"
                class="gray-800 relative z-1 ml-2 flex h-14 w-14 transform items-center justify-center overflow-hidden rounded-full bg-gray-300 p-0 text-2xl drop-shadow transition-transform duration-250 hover:bg-gray-300 active:bg-gray-400 [&>svg]:text-black [&>svg]:fill-black"
            >
                <template v-if="cellNumber && markedCells.get(cellNumber)">
                    {{ markedCells.get(cellNumber) }}
                </template>
                <div
                    class="kd-gradient pointer-events-none absolute top-0 left-0 h-4 w-full rounded-full"
                />
            </u-button>
        </template>
        <template #content>
            <div class="flex gap-2 p-2">
                <u-button
                    v-for="emoji in MARKS"
                    :key="emoji"
                    variant="soft"
                    color="primary"
                    class="h-12 w-12 rounded-full"
                    :class="[
                        'rounded-full border-2 p-2 text-3xl transition',
                        cellNumber && markedCells.get(cellNumber) === emoji
                            ? 'border-primary bg-primary/10'
                            : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
                    ]"
                    @click="handleMarkClick(cellNumber, emoji)"
                >
                    {{ emoji }}
                </u-button>
                <u-button
                    variant="ghost"
                    color="neutral"
                    class="h-12 w-12 items-center justify-center rounded-full"
                    icon="i-mdi:cancel"
                    aria-label="Очистить маркер"
                    :class="['rounded-full p-2 text-2xl transition']"
                    @click="cellNumber && unmarkCell(cellNumber)"
                />
            </div>
        </template>
    </u-popover>
</template>
