import { API_BASE_URL } from '@/constants/constants';
import { ApiMethods } from '@/types/types';

export class ApiRequest {
  protected readonly baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  protected async get<T>(
    path: string,
    typeGuard: (data: unknown) => data is T,
    signal?: AbortSignal
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Get,
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: unknown = await response.json();
    if (typeGuard(data)) {
      return data;
    }
    throw new Error('Invalid response format');
  }

  protected async post<T>(
    path: string,
    data: unknown,
    typeGuard: (data: unknown) => data is T,
    signal?: AbortSignal
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const responseData: unknown = await response.json();
    if (typeGuard(responseData)) {
      return responseData;
    }
    throw new Error('Invalid response format');
  }

  protected async delete(path: string, signal?: AbortSignal): Promise<void> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Delete,
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
  }

  protected async put<T>(
    path: string,
    data: unknown,
    typeGuard: (data: unknown) => data is T,
    signal?: AbortSignal
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Put,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const responseData: unknown = await response.json();
    if (typeGuard(responseData)) {
      return responseData;
    }
    throw new Error('Invalid response format');
  }

  protected async patch<T>(
    path: string,
    data: unknown,
    typeGuard: (data: unknown) => data is T,
    signal?: AbortSignal
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: ApiMethods.Patch,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const responseData: unknown = await response.json();
    if (typeGuard(responseData)) {
      return responseData;
    }
    throw new Error('Invalid response format');
  }
}
