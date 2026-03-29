export interface APIResultSet<T = unknown> {
    data: T;
    status: number;
    message?: string;
}

export interface RequestConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    params?: Record<string, string | number | boolean>;
    data?: unknown;
    headers?: Record<string, string>;
    signal?: AbortSignal;
    timeoutMs?: number;
}

export type ShorthandConfig = Omit<RequestConfig, 'url' | 'method' | 'data'>;

export class NetworkError extends Error {
    constructor(cause: unknown) {
        super('Network request failed');
        this.name = 'NetworkError';
        this.cause = cause;
    }
}