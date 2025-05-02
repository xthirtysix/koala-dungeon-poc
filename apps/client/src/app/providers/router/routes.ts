import { DefaultLayout } from '@/shared/ui/layouts'

export const routes = [
    {
        path: '/library/events',
        name: 'home',
        component: () => import('@/pages/journal'),
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
