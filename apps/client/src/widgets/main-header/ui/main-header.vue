<script setup lang="ts">
import { useMainHeader } from '../model/main-header'
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
    <header class="header drop-shadow-md">
        <div class="max-w-7xl container mx-auto">
            <div class="header__content px-4 sm:mx-0">
                <router-link to="/" class="header__logo min-w-[11rem]">
                    <span class="header__logo-text font-amatic uppercase"
                        >Подземелья и Коалы</span
                    >
                </router-link>

                <button
                    class="md:hidden flex flex-col justify-center items-center w-10 h-10 ml-2"
                    @click="toggleMenu"
                    aria-label="Открыть меню"
                >
                    <span
                        class="block w-6 h-0.5 bg-white mb-1 rounded transition-all"
                        :class="{ 'rotate-45 translate-y-1.5': isMenuOpen }"
                    ></span>
                    <span
                        class="block w-6 h-0.5 bg-white mb-1 rounded transition-all"
                        :class="{ 'opacity-0': isMenuOpen }"
                    ></span>
                    <span
                        class="block w-6 h-0.5 bg-white rounded transition-all"
                        :class="{ '-rotate-45 -translate-y-1.5': isMenuOpen }"
                    ></span>
                </button>

                <u-navigation-menu
                    class="hidden md:block font-amatic font-bold text-3xl"
                    highlight
                    highlight-color="primary"
                    content-orientation="horizontal"
                    :items="items"
                    :ui="{
                        link: 'text-xl font-bold',
                        childLinkLabel: 'text-xl font-bold',
                        childLinkIcon: 'relative top-1',
                    }"
                />
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
            class="fixed inset-0 bg-neutral-900/95 text-white flex flex-col justify-center gap-4 px-[10px]"
        >
            <template v-for="item in items" :key="item.label">
                <router-link
                    v-if="!item.children"
                    :to="item.to"
                    class="text-2xl py-3 px-8 rounded hover:bg-primary-700 transition-colors w-full max-w-xs mx-auto text-center"
                    @click="toggleMenu"
                >
                    {{ item.label }}
                </router-link>
                <div v-else class="w-full flex flex-col items-center">
                    <div
                        class="font-bold text-xl mt-4 mb-2 w-full max-w-xs mx-auto text-center"
                    >
                        {{ item.label }}
                    </div>
                    <div class="flex flex-col gap-2 w-full max-w-xs mx-auto">
                        <router-link
                            v-for="child in item.children"
                            :key="child.label"
                            :to="child.to"
                            class="text-lg py-2 px-6 rounded hover:bg-primary-700 transition-colors w-full text-center"
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
.header {
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: var(--header-height);
    background-color: var(--ui-bg);
}

.header__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__logo {
    position: relative;
    display: flex;
    padding-left: 0.5rem;
    align-items: center;
    transition: opacity 0.2s;
    text-decoration: none;
    overflow: visible;
}

.header__logo::before {
    content: '';
    position: absolute;
    top: -2rem;
    left: -1.5rem;
    display: block;
    width: 55px;
    height: 88px;
    background-image: url('@/app/assets/images/logo_left.png');
    transform: scale(50%);
}

.header__logo::after{
    content: '';
    position: absolute;
    top: -1.85rem;
    right: -2.5rem;
    display: block;
    width: 89px;
    height: 100px;
    background-image: url('@/app/assets/images/logo_right.png');
    transform: scale(50%);
}

.header__logo-text {
    z-index: 1;
    font-size: 1.75rem;
    font-weight: bold;
}

.header__logo:hover {
    opacity: 0.9;
}

.header__nav {
    flex: 1;
    justify-content: flex-end;
}

.nav-content {
    position: fixed;
    top: var(--header-height);
    background-color: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    z-index: 50;
    width: 320px;
}

:root {
    --header-height: 4rem;
}
</style>
