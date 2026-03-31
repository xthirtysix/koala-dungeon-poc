import { API_URL } from '../config/consts/api.consts'
import { HttpClient } from './client'

export const publicApi = new HttpClient({ baseUrl: API_URL })

export const privateApi = new HttpClient({
    baseUrl: API_URL,
    kyOptions: {
        retry: {
            limit: 1,
            statusCodes: [401],
            methods: ['get', 'post', 'put', 'patch', 'delete'],
        },
        hooks: {
            beforeRequest: [
                async (request) => {
                    const token = localStorage.getItem('jwt')

                    if (token) {
                        request.headers.set('Authorization', `Bearer ${token}`)
                    }
                },
            ],
        },
    },
})
