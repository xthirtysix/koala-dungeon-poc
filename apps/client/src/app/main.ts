import './assets/safelist.css'
import './assets/main.css'

import { createApp } from 'vue'
import { router } from '@/app/providers'
import { createPinia } from 'pinia'
import uiPlugin from '@nuxt/ui/vue-plugin'
import { useUserStore } from '@/entities/user'
import { getCurrentUser } from '@/entities/user/api/user.api'
import { useMarathonStore } from '@/entities/marathon'
import { PiniaColada } from '@pinia/colada'

import App from './app.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(uiPlugin)
app.use(router)
app.use(pinia)
app.use(PiniaColada)

app.mount('#app')

const marathonStore = useMarathonStore()
marathonStore.fetchMarathon()

const jwt = localStorage.getItem('jwt')
if (jwt) {
    getCurrentUser()
        .then((user) => {
            const userStore = useUserStore()
            userStore.setUser({
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar?.url || '',
            })
        })
        .catch(() => {
            localStorage.removeItem('jwt')
        })
}
