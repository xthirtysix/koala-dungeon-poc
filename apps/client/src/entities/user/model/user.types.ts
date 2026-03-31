export interface AuthResponse {
    jwt: string
    user: {
        id: number
        username: string
        email: string
        avatar: {
            url: string
        }
    }
}

export type User = {
    id: number
    username: string
    email: string
    avatar: string
}

