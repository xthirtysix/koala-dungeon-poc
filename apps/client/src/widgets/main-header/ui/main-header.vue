<script setup lang="ts">
import { useMainHeader } from '../model/main-header'
import ThemeSwitcher from './theme-switcher.vue'

defineOptions({
    name: 'main-header',
})

const { menuItems: items } = useMainHeader()
</script>

<template>
    <header class="header drop-shadow-md">
        <div class="max-w-7xl container mx-auto">
            <div class="header__content">
                <router-link to="/" class="header__logo min-w-[11rem]">
                    <span class="header__logo-text">Koala Dungeon</span>
                </router-link>

                <u-navigation-menu
                    highlight
                    highlight-color="primary"
                    content-orientation="vertical"
                    :items="items"
                />

                <div class="flex justify-end min-w-[11rem]">
                    <theme-switcher />
                </div>
            </div>
        </div>
    </header>
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
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
    text-decoration: none;
}

.header__logo-text {
    font-size: 1.5rem;
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
