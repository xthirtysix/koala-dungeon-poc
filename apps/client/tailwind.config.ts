import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/**/*.{js,vue,ts}',
        './src/components/**/*.{js,vue,ts}',
        './src/layouts/**/*.vue',
        './src/pages/**/*.vue',
        './src/plugins/**/*.{js,ts}',
        './src/app.vue',
        './node_modules/@nuxt/ui/**/*.{js,vue,ts}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config
