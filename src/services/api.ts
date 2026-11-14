const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1').replace(/\/+$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {'Content-Type': 'application/json', ...(init?.headers ?? {})},
    });
    if (!response.ok) {
        const message = await response.text();
        throw new Error(`API ${response.status}: ${message || response.statusText}`);
    }
    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
}

export const get = <T>(path: string) => request<T>(path);
export const post = <T>(path: string, body: unknown) =>
    request<T>(path, {method: 'POST', body: JSON.stringify(body)});
export const put = <T>(path: string, body: unknown) =>
    request<T>(path, {method: 'PUT', body: JSON.stringify(body)});
export const del = (path: string) => request<void>(path, {method: 'DELETE'});
