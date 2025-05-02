import './assets/main.css'

import { createApp } from 'vue'
import { router } from '@/app/providers'
import uiPlugin from '@nuxt/ui/vue-plugin'

import App from './app.vue'

const app = createApp(App)

app.use(uiPlugin)
app.use(router)

app.mount('#app')
