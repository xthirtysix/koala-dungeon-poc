import { DefaultLayout } from '@/shared/ui/layouts'

export const routes = [
    {
        path: '/library/artefacts',
        name: 'artefacts',
        component: () => import('@/pages/artefacts'),
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '/library/events',
        name: 'journal',
        component: () => import('@/pages/journal'),
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '/library/rules',
        name: 'rules',
        component: () => import('@/pages/rules'),
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '/library/obstacles',
        name: 'obstacles',
        component: () => import('@/pages/obstacles'),
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '/leaderboard',
        name: 'leaderboard',
        component: () => import('@/pages/leaderboard'),
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/about'),
        meta: {
            layout: DefaultLayout,
        },
    },
    {
        path: '/:pathMatch(.*)',
        component: () => import('@/pages/home'),
        meta: {
            layout: DefaultLayout,
        },
    },
]
