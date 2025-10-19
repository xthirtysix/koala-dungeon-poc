import { type AuthResponse } from '@/entities/user'
import { buildQuery } from '@/shared/api'
import { API_URL } from '@/shared/config/consts/api.consts'

export interface LoginParams {
    identifier: string
    password: string
}

export async function login({
    identifier,
    password,
}: LoginParams): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.error?.message || 'Ошибка авторизации')
    }

    return res.json()
}

export async function getCurrentUser(jwt: string) {
    const query = buildQuery({
        'populate[avatar][fields][0]': 'url',
    })

    const res = await fetch(`${API_URL}/users/me?${query}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })
    if (!res.ok) {
        throw new Error('Ошибка получения пользователя')
    }
    return res.json()
}
