export function buildQuery(params: Record<string, any>): string {
    const esc = encodeURIComponent
    return Object.entries(params)
        .map(([k, v]) =>
            Array.isArray(v)
                ? v.map((val) => `${esc(k)}=${esc(val)}`).join('&')
                : `${esc(k)}=${esc(v)}`,
        )
        .join('&')
}
