import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,vue,ts}',
    './node_modules/@nuxt/ui/**/*.{js,vue,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config 