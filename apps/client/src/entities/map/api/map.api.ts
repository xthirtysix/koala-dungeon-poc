import { MARATHON_VERSION } from '@/shared/config/consts/api.consts'
import { publicApi, privateApi } from '@/shared/api'

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
): Promise<CustomMarksUpdateResponse> {
    const customMarksObject: Record<number, string> = {}
    customMarks.forEach((value, key) => {
        customMarksObject[key] = value
    })

    return privateApi.put<CustomMarksUpdateResponse>(
        `maps/${MARATHON_VERSION}`, {
        json: {
            custom_marks: customMarksObject,
            marathon_version: MARATHON_VERSION,
        },
    })
}

export async function getCustomMarks(marathonVersion: string): Promise<CustomMarksGetResponse> {
    return publicApi.get<CustomMarksGetResponse>('/maps', {
        searchParams: { marathon_version: marathonVersion },
    })
}
