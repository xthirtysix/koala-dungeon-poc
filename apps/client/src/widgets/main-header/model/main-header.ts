import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useMainHeader() {
    const route = useRoute()

    const menuItems = computed(() => [
        {
            label: 'Главная',
            icon: 'i-ph:house-simple',
            to: '/',
        },
        {
            label: 'Карта',
            icon: 'i-ph:map-trifold',
            to: '/map',
            badge: 'beta',
            slot: 'components' as const,
        },
        {
            label: 'Библиотека',
            icon: 'i-ph:book',
            active: route.path.includes('library'),
            children: [
                {
                    label: 'Правила',
                    description: 'Основные правила игры и механики',
                    icon: 'i-ph:scroll',
                    to: '/library/rules',
                },
                {
                    label: 'Помехи',
                    description: 'Опасности и препятствия в подземелье',
                    icon: 'i-ph:bomb',
                    to: '/library/obstacles',
                },
                {
                    label: 'Артефакты',
                    description: 'Магические предметы и сокровища',
                    icon: 'i-ph:treasure-chest',
                    to: '/library/artefacts',
                },
                {
                    label: 'Журнал событий',
                    description: 'События и приключения в игре',
                    icon: 'i-ph:book-open-text',
                    to: '/library/events',
                },
            ],
        },
        {
            label: 'Зал славы',
            icon: 'i-ph:crown-simple',
            to: '/leaderboard',
        },
        {
            label: 'О нас',
            icon: 'i-ph:identification-card',
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
