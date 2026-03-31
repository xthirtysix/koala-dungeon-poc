import { HTTPError } from 'ky'

export class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly statusText: string,
        public readonly data: unknown,
        public readonly url: string,
    ) {
        super(`HTTP ${status}: ${statusText} [${url}]`)
        this.name = 'ApiError'
    }

    static async fromKyError(e: HTTPError): Promise<ApiError> {
        const data = await e.response.json().catch(() => null)

        return new ApiError(
            e.response.status,
            e.response.statusText,
            data,
            e.response.url,
        )
    }
}
