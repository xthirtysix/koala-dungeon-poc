import { type AuthResponse } from '@/entities/user'
import { publicApi, privateApi } from '@/shared/api'
import qs from 'qs'

export interface LoginParams {
    identifier: string
    password: string
}

interface GetCurrentUserResponse {
    id: number
    username: string
    email: string
    avatar: {
        url: string
    }
}

export async function login({
    identifier,
    password,
}: LoginParams): Promise<AuthResponse> {
    return publicApi.post<AuthResponse>('auth/local', {
        json: { identifier, password },
    })
}

export async function getCurrentUser() {
    const response = await privateApi.get<GetCurrentUserResponse>('users/me', {
        searchParams: qs.stringify({
            populate: {
                avatar: {
                    fields: ['url'],
                },
            }
        })
    })
    return response
}

