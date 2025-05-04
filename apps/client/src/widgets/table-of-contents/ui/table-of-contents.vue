<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'
import { useActiveHeadings } from '@/widgets/table-of-contents'
import { ref } from 'vue'

const props = defineProps<{
    title: string
    links: TocLink[]
}>()

const tocContainerRef = ref<HTMLElement | null>(null)

const { indicator, isActive, scrollToHeading, activeElementsClass } =
    useActiveHeadings(props.links, tocContainerRef)
</script>

<template>
    <div class="max-h-full overflow-y-auto scrollbar-thin">
        <h4 v-if="title" class="font-medium mb-3 text-sm">{{ title }}</h4>
        <div ref="tocContainerRef" class="relative pl-3">
            <div
                class="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-500/10 rounded-sm"
            />

            <div
                v-if="indicator"
                class="absolute left-0 w-0.5 bg-primary-500 rounded-sm z-10 transition-all duration-200 ease-in-out"
                :style="{
                    top: `${indicator.top}px`,
                    height: `${indicator.height}px`,
                }"
            />

            <ul class="toc prose dark:prose-invert text-xs">
                <li
                    v-for="(link, index) in links"
                    :key="link.id"
                    class="relative m-0"
                >
                    <div
                        class="relative flex items-center"
                        :class="{ [activeElementsClass]: isActive(link.id) }"
                    >
                        <a
                            :href="`#${link.id}`"
                            class="block no-underline py-0.5 transition-colors duration-200 hover:text-primary-500"
                            @click.prevent="
                                scrollToHeading(link.id, index === 0)
                            "
                        >
                            {{ link.text }}
                        </a>
                    </div>
                    <ul
                        v-if="link.children"
                        class="ml-2 my-0 list-none pl-4 relative"
                    >
                        <li
                            v-for="child in link.children"
                            :key="child.id"
                            class="relative m-0"
                        >
                            <div
                                class="relative flex items-center"
                                :class="{
                                    [activeElementsClass]: isActive(child.id),
                                }"
                            >
                                <a
                                    :href="`#${child.id}`"
                                    class="block no-underline py-0.5 transition-colors duration-200 hover:text-primary-500"
                                    @click.prevent="scrollToHeading(child.id)"
                                >
                                    {{ child.text }}
                                </a>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="css">
.toc :where(ul):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
    list-style: none;
    padding-left: 0.25rem;
    margin: 0;
}

.scrollbar-thin::-webkit-scrollbar {
    width: 1px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgba(125, 125, 125, 0.3);
    border-radius: 4px;
}
</style>
