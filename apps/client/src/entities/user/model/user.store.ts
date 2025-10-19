import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type User } from '@/entities/user'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)

    const setUser = (userData: User) => {
        user.value = userData
    }

    const clearUser = () => {
        user.value = null
    }

    return {
        user,
        setUser,
        clearUser,
    }
})
