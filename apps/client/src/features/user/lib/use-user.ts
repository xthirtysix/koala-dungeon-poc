import { useRouter } from 'vue-router'
import {
    login as loginUser,
    getCurrentUser,
    useUserStore,
    type LoginParams,
} from '@/entities/user'
import { type User } from '@/entities/user'

export function useUser() {
    const router = useRouter()
    const userStore = useUserStore()

    async function login(params: LoginParams): Promise<User> {
        try {
            const response = await loginUser(params)
            localStorage.setItem('jwt', response.jwt)

            const userResponse = await getCurrentUser()
            const user = { ...userResponse, avatar: userResponse.avatar.url || '' }
            userStore.setUser(user)

            return user
        } catch (error) {
            userStore.clearUser()
            throw error
        }
    }

    async function logout() {
        try {
            userStore.clearUser()
            localStorage.removeItem('jwt')
            router.push('/auth')
        } catch (error) {
            console.error(error)
        }
    }

    return {
        login,
        logout,
    }
}
