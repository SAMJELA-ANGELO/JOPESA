const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://jopesa-backend.onrender.com' || 'http://localhost:3000';

export function getApiBase() {
  return API_BASE;
}

export function getAlumniToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('jopesa_alumni_token');
}

export function getAlumniUser<T = Record<string, unknown>>(): T | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('jopesa_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearAlumniSession() {
  localStorage.removeItem('jopesa_alumni_token');
  localStorage.removeItem('jopesa_user');
}

export function authHeaders(token?: string | null): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const authToken = token ?? getAlumniToken();
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  return headers;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
  requireAuth = false,
): Promise<T> {
  const token = getAlumniToken();
  if (requireAuth && !token) {
    throw new Error('Not authenticated');
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = Array.isArray(payload?.message)
      ? payload.message.join(', ')
      : payload?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object' && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: T[] }).data;
  }
  return [];
}

export function eventImages(event: { image?: string | null; images?: string[] | null }): string[] {
  const fromArray = Array.isArray(event.images) ? event.images.filter(Boolean) : [];
  if (fromArray.length > 0) return Array.from(new Set(fromArray));
  if (event.image) return [event.image];
  return [];
}

export function formatDate(value?: string | Date | null) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateRange(start?: string | null, end?: string | null) {
  const startLabel = formatDate(start);
  const endLabel = formatDate(end);
  if (startLabel && endLabel && startLabel !== endLabel) {
    return `${startLabel} – ${endLabel}`;
  }
  return startLabel || endLabel || '';
}
