<script setup lang="ts">
import { useMainHeader, ThemeSwitcher } from '@/widgets/main-header'
import { ref } from 'vue'

defineOptions({
    name: 'main-header',
})

const { menuItems: items } = useMainHeader()
const isMenuOpen = ref(false)
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
    <header
        class="max-w-auto sticky top-0 z-[100] mx-auto h-[var(--header-height)] w-full border-b border-white/10 bg-[var(--ui-bg)] py-3 drop-shadow-md sm:py-1"
    >
        <div class="container mx-auto max-w-7xl">
            <div class="flex items-center justify-between px-4 sm:mx-0 sm:flex">
                <router-link
                    to="/"
                    class="header__logo relative flex min-w-[11rem] items-center overflow-visible pl-2 no-underline transition-opacity duration-200"
                >
                    <span class="font-amatic z-[1] text-4xl font-bold uppercase"
                        >Подземелья и Коалы</span
                    >
                </router-link>

                <button
                    class="order-2 ml-4 flex h-10 w-10 flex-col items-center justify-center md:hidden"
                    @click="toggleMenu"
                    aria-label="Открыть меню"
                >
                    <span
                        class="mb-1 block h-0.5 w-6 rounded bg-black transition-all dark:bg-white"
                        :class="{ 'translate-y-1.5 rotate-45': isMenuOpen }"
                    ></span>
                    <span
                        class="mb-1 block h-0.5 w-6 rounded bg-black transition-all dark:bg-white"
                        :class="{ 'opacity-0': isMenuOpen }"
                    ></span>
                    <span
                        class="block h-0.5 w-6 rounded bg-black transition-all dark:bg-white"
                        :class="{ '-translate-y-1.5 -rotate-45': isMenuOpen }"
                    ></span>
                </button>

                <u-navigation-menu
                    class="ml-auto hidden text-3xl md:block"
                    highlight
                    highlight-color="primary"
                    content-orientation="horizontal"
                    :items="items"
                    :ui="{
                        link: 'text-2xl font-amatic font-bold',
                        childLinkLabel: 'text-2xl font-amatic font-bold',
                        childLinkIcon: 'relative top-1',
                    }"
                />

                <theme-switcher class="order-1 ml-auto md:ml-4" />
            </div>
        </div>
    </header>
    <!-- Мобильное меню вне header -->
    <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-50 flex md:hidden"
        @click.self="toggleMenu"
    >
        <nav
            class="fixed inset-0 flex flex-col justify-center gap-4 bg-white px-[10px] text-black dark:bg-neutral-900/95 dark:text-white"
        >
            <template v-for="item in items" :key="item.label">
                <router-link
                    v-if="!item.children"
                    :to="item.to"
                    class="hover:bg-primary-700 mx-auto w-full max-w-xs rounded px-8 py-3 text-center text-2xl transition-colors"
                    @click="toggleMenu"
                >
                    {{ item.label }}
                </router-link>
                <div v-else class="flex w-full flex-col items-center">
                    <div class="mx-auto flex w-full max-w-xs flex-col gap-2">
                        <router-link
                            v-for="child in item.children"
                            :key="child.label"
                            :to="child.to"
                            class="hover:bg-primary-700 mx-auto w-full max-w-xs rounded px-8 py-3 text-center text-2xl transition-colors"
                            @click="toggleMenu"
                        >
                            {{ child.label }}
                        </router-link>
                    </div>
                </div>
            </template>
        </nav>
    </div>
</template>

<style scoped>
:root {
    --header-height: 4rem;
}

.header__logo::before {
    content: '';
    position: absolute;
    top: -1.75rem;
    left: -1.5rem;
    display: block;
    width: 55px;
    height: 88px;
    background-image: url('@/app/assets/images/logo_left.png');
    transform: scale(50%);
}

.header__logo::after {
    content: '';
    position: absolute;
    top: -1.75rem;
    right: -3rem;
    display: block;
    width: 89px;
    height: 100px;
    background-image: url('@/app/assets/images/logo_right.png');
    transform: scale(50%);
}

.header__logo:hover {
    opacity: 0.9;
}
</style>
