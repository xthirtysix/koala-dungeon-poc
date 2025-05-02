import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ui({
            ui: {
                colors: {
                    primary: 'violet',
                    neutral: 'slate',
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '#mdc-imports': path.resolve(__dirname, './stub-mdc-imports.js'),
            '#mdc-configs': path.resolve(__dirname, './stub-mdc-imports.js'),
            // '@nuxtjs/mdc': path.resolve(__dirname, './stub-mdc-imports.js'),
        },
    },
})
