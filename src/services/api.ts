const API_BASE_URL = (
    process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'
).replace(/\/+$/, '');

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
    });

    if (!response.ok) {
        const mensagem = await response.text();
        throw new Error(`API ${response.status}: ${mensagem || response.statusText}`);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}
