import { API_URL, MARATHON_VERSION } from '@/shared/config/consts/api.consts'

export interface CustomMarksUpdateRequest {
    custom_marks: Record<number, string>
    marathon_version: string
}

export interface CustomMarksUpdateResponse {
    success: boolean
    message?: string
}

export interface CustomMarksGetResponse {
    data: Array<{
        id: number
        documentId: string
        custom_marks: Record<number, string> | null
        createdAt: string
        updatedAt: string
        publishedAt: string
        locale: string | null
        marathon_version: string
        createdBy: {
            id: number
            documentId: string
            firstname: string
            lastname: string
            username: string | null
            email: string
            password: string
            resetPasswordToken: string | null
            registrationToken: string | null
            isActive: boolean
            blocked: boolean
            preferedLanguage: string | null
            createdAt: string
            updatedAt: string
            publishedAt: string
            locale: string | null
        }
        updatedBy: {
            id: number
            documentId: string
            firstname: string
            lastname: string
            username: string | null
            email: string
            password: string
            resetPasswordToken: string | null
            registrationToken: string | null
            isActive: boolean
            blocked: boolean
            preferedLanguage: string | null
            createdAt: string
            updatedAt: string
            publishedAt: string
            locale: string | null
        }
        localizations: unknown[]
    }>
}

export async function updateCustomMarks(
    customMarks: Map<number, string>,
    jwt: string
): Promise<CustomMarksUpdateResponse> {
    const customMarksObject: Record<number, string> = {}
    customMarks.forEach((value, key) => {
        customMarksObject[key] = value
    })

    const res = await fetch(`${API_URL}/maps/${MARATHON_VERSION}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            custom_marks: customMarksObject,
            marathon_version: MARATHON_VERSION,
        } as CustomMarksUpdateRequest),
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.error?.message || 'Ошибка обновления меток карты')
    }

    return res.json()
}

export async function getCustomMarks(marathonVersion: string): Promise<CustomMarksGetResponse> {
    const res = await fetch(`${API_URL}/maps?marathon_version=${marathonVersion}`, {
        method: 'GET',
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.error?.message || 'Ошибка получения меток карты')
    }

    return res.json()
}
