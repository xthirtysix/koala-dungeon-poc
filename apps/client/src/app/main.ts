import './assets/main.css'

import { createApp } from 'vue'
import { router } from '@/app/providers'
import { createPinia } from 'pinia'
import uiPlugin from '@nuxt/ui/vue-plugin'

import App from './app.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(uiPlugin)
app.use(router)
app.use(pinia)

app.mount('#app')
