import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useMainHeader() {
    const route = useRoute()

    const menuItems = computed(() => [
        {
            label: 'Главная',
            icon: 'i-material-symbols:home-rounded',
            to: '/',
        },
        {
            label: 'Библиотека',
            icon: 'i-material-symbols:book-2-rounded',
            active: route.path.includes('library'),
            children: [
                {
                    label: 'Правила',
                    description: 'Основные правила игры и механики',
                    icon: 'i-game-icons:scroll-unfurled',
                    to: '/library/rules',
                },
                {
                    label: 'Помехи',
                    description: 'Опасности и препятствия в подземелье',
                    icon: 'i-game-icons:wolf-trap',
                    to: '/library/obstacles',
                },
                {
                    label: 'Артефакты',
                    description: 'Магические предметы и сокровища',
                    icon: 'i-game-icons:open-treasure-chest',
                    to: '/library/artefacts',
                },
                {
                    label: 'Журнал событий',
                    description: 'События и приключения в игре',
                    icon: 'i-game-icons:bookmarklet',
                    to: '/library/events',
                },
            ],
        },
        {
            label: 'Зал славы',
            icon: 'i-material-symbols:crown-rounded',
            to: '/leaderboard',
        },
        {
            label: 'О нас',
            icon: 'i-material-symbols:info-rounded',
            to: '/about',
        },
    ])

    const libraryPages = computed(() => {
        return (
            menuItems.value.find((i) => i.label === 'Библиотека')?.children ||
            []
        )
    })

    return { menuItems, libraryPages }
}
