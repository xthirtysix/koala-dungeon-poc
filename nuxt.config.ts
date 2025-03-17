// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // ssr: false,
    compatibilityDate: '2025-03-12',
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: true },
    srcDir: 'src',
    app: {
        baseURL: '/',
    },
    dir: {
        app: 'app',
        pages: 'app/routes',
        layouts: 'app/layouts',
    },
    modules: ['@nuxt/ui', '@nuxt/image'],
    css: ['~/app/assets/css/main.css'],
    alias: {
        public: '../public',
    },
    image: {
        domains: ['xthirtysix.ru'],
        quality: 80,
        format: ['avif', 'webp', 'png'],
        presets: {
            artefact: {
                modifiers: {
                    width: 300,
                    height: 300,
                },
            },
        },
    },
})
