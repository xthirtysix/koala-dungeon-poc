import ky, { type KyInstance, type Options, HTTPError } from 'ky'
import { ApiError } from './errors'

export interface RequestOptions {
    searchParams?: Options['searchParams']
    json?: unknown
    headers?: Record<string, string>
    kyOptions?: Omit<Options, 'searchParams' | 'json' | 'headers'>
}

export interface HttpClientConfig {
    baseUrl: string
    defaultHeaders?: Record<string, string>
    kyOptions?: Options
}

export class HttpClient {
    protected instance: KyInstance

    constructor(config: HttpClientConfig) {
        this.instance = ky.create({
            prefixUrl: config.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                ...config.defaultHeaders,
            },
            retry: 0,
            ...config.kyOptions,
        })
    }

    private buildOptions(options: RequestOptions = {}): Options {
        return {
            searchParams: options.searchParams,
            json: options.json,
            headers: options.headers,
            ...options.kyOptions,
        }
    }

    private async handleError(e: unknown): Promise<never> {
        console.error(e)

        if (e instanceof HTTPError) {
            throw await ApiError.fromKyError(e)
        }

        throw e
    }

    async get<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.instance
            .get(path, this.buildOptions(options))
            .json<T>()
            .catch(this.handleError)
    }

    async post<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.instance
            .post(path, this.buildOptions(options))
            .json<T>()
            .catch(this.handleError)
    }

    async put<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.instance
            .put(path, this.buildOptions(options))
            .json<T>()
            .catch(this.handleError)
    }

    async patch<T>(path: string, options?: RequestOptions): Promise<T> {
        return this.instance
            .patch(path, this.buildOptions(options))
            .json<T>()
            .catch(this.handleError)
    }

    async delete<T = void>(path: string, options?: RequestOptions): Promise<T> {
        const res = this.instance.delete(path, this.buildOptions(options))
        return res
            .then((r) => (r.status === 204 ? (undefined as T) : res.json<T>()))
            .catch(this.handleError)
    }
}
