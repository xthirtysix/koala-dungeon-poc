export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    future: {
        compatibilityVersion: 4,
    },
    ssr: false,
    devtools: { enabled: false },
    components: {
        global: true,
        dirs: [
            {
                path: '~/widgets/dice-badge/ui',
                extensions: ['.vue'],
                prefix: 'dice',
            },
            {
                path: '~/shared/badge/ui',
                extensions: ['.vue'],
                prefix: 'kd',
            },
        ],
    },
    mdc: {
        components: {
            prose: true,
        },
    },

    modules: [
      '@nuxt/eslint',
      '@nuxt/image',
      '@nuxt/ui',
      '@nuxt/test-utils',
      '@nuxt/icon',
      '@nuxtjs/mdc',
      '@nuxtjs/strapi',
    ],

    image: {
        provider: 'ipx',
        dir: 'public',
        presets: {
            trophy: {
                modifiers: {
                    format: 'png',
                    width: 32,
                    height: 32,
                },
            },
        },
    },

    srcDir: 'src',
    app: {
        baseURL: '/',
    },
    dir: {
        app: 'app',
        pages: 'app/routes',
        layouts: 'app/layouts',
    },
    css: ['~/app/assets/css/main.css'],
    alias: {
        assets: 'assets',
        public: '../public',
    },
})
