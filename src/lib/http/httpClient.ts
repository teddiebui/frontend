// src/lib/http/httpClient.ts
import { NetworkError } from './types';
import type { APIResultSet, RequestConfig, ShorthandConfig } from './types';

// --- Interceptors ---
type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = <T>(result: APIResultSet<T>) => APIResultSet<T> | Promise<APIResultSet<T>>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

// --- Helpers ---

function buildUrl(url: string, params?: RequestConfig['params']): string {
    if (!params || Object.keys(params).length === 0) return url;

    const query = new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>(
            (acc, [k, v]) => ({ ...acc, [k]: String(v) }),
            {},
        ),
    ).toString();

    return url.includes('?') ? `${url}&${query}` : `${url}?${query}`;
}

async function parseBody(res: Response): Promise<unknown> {
    const contentType = res.headers.get('Content-Type') ?? '';

    if (res.status === 204 || !contentType) return null;
    if (contentType.includes('application/json')) return res.json();

    return res.text();
}

// --- Core ---

async function request<T = unknown>(config: RequestConfig): Promise<APIResultSet<T>> {
    // Run request interceptors
    let finalConfig = config;
    for (const interceptor of requestInterceptors) {
        finalConfig = await interceptor(finalConfig);
    }

    const { url, method, params, data, headers, signal, timeoutMs = 30_000 } = finalConfig;

    // Timeout via AbortSignal (composable với signal bên ngoài)
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);

    const combinedSignal = signal
        ? AbortSignal.any([signal, timeoutController.signal])
        : timeoutController.signal;

    const fetchOptions: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        signal: combinedSignal,
        credentials: 'include',
        ...(data !== undefined && method !== 'GET' ? { body: JSON.stringify(data) } : {}),
    };

    try {
        const res = await fetch(buildUrl(url, params), fetchOptions);
        clearTimeout(timeoutId);

        const body = await parseBody(res);


        let result: APIResultSet<T> = body as APIResultSet<T>;

        // Run response interceptors
        for (const interceptor of responseInterceptors) {
            result = await interceptor(result);
        }

        return result;
    } catch (error) {
        clearTimeout(timeoutId);


        throw new NetworkError(error);
    }
}

// --- Public API ---

export const httpClient = {
    request,

    get<T = unknown>(url: string, config: ShorthandConfig = {}) {
        return request<T>({ ...config, url, method: 'GET' });
    },

    post<T = unknown>(url: string, data?: unknown, config: ShorthandConfig = {}) {
        return request<T>({ ...config, url, method: 'POST', data });
    },

    put<T = unknown>(url: string, data?: unknown, config: ShorthandConfig = {}) {
        return request<T>({ ...config, url, method: 'PUT', data });
    },

    patch<T = unknown>(url: string, data?: unknown, config: ShorthandConfig = {}) {
        return request<T>({ ...config, url, method: 'PATCH', data });
    },

    delete<T = unknown>(url: string, config: ShorthandConfig = {}) {
        return request<T>({ ...config, url, method: 'DELETE' });
    },

    // Interceptor registration
    addRequestInterceptor(fn: RequestInterceptor) {
        requestInterceptors.push(fn);
    },

    addResponseInterceptor(fn: ResponseInterceptor) {
        responseInterceptors.push(fn);
    },
} as const;