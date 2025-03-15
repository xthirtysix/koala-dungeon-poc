<script setup lang="ts">
const items = [
    {
        label: 'AloeKoala',
        avatar: {
            src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/7be25119-ee5c-48b7-8204-8a5272eddf81-profile_image-70x70.png',
        },
        badge: 100,
        to: '/',
    },
    {
        label: 'Карта',
        icon: 'i-game-icons:treasure-map',
        to: '/map',
    },
    {
        label: 'Журнал',
        icon: 'i-game-icons:bookmarklet',
        to: '/journal',
    },
    {
        label: 'Помехи',
        icon: 'i-game-icons:banana-peel',
        to: '/interferences',
    },
    {
        label: 'Артефакты',
        icon: 'i-game-icons:open-treasure-chest',
        to: '/artefacts',
    },
    {
        label: 'Зал славы',
        icon: 'i-game-icons:laurel-crown',
        to: '/leaderboard',
    },
]

const ui = {
    list: 'grid gap-2.5',
    link: 'gap-5',
}
</script>

<template>
        <UNavigationMenu
            as="nav"
            orientation="vertical"
            :items="items"
            :ui="ui"
            class="data-[orientation=vertical]:w-48"
        />
</template>
