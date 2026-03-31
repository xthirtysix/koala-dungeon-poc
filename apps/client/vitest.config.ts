import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            enabled: true,
            provider: 'v8',
            reportsDirectory: './coverage/',
            reporter: ['text', 'html', 'lcov'],
            exclude: [
                '**/node_modules/**',
                '**/dist/**',
                '**/*.d.ts',
                '**/index.ts',
            ],
        },
    },
    plugins: [vue()],
})
