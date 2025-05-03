import { DefaultLayout } from '@/shared/ui/layouts'

export const routes = [
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
        path: '/:pathMatch(.*)',
        component: () => import('@/pages/home'),
        meta: {
            layout: DefaultLayout,
        },
    },
]
