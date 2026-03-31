type PersistedFields = {
    id: number
    documentId: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}

export type Persisted<T extends Record<string | number | symbol, unknown>> = T &
    PersistedFields
