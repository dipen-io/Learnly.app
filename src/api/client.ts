// src/api/client.ts
//
// Note: this file's interceptor dynamically imports auth-store (not
// cart-store) — that one's fine, since auth-store no longer imports
// anything cart-related, so there's no cycle through this file either.

import { config } from '@/constants/config';
import axios from 'axios';
import { router } from 'expo-router';
import {
    deleteTokens,
    getRefreshToken,
    updateAccessToken,
} from '../utils/token-storage';

export const apiClient = axios.create({
    baseURL: config.apiUrl,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

const SKIP_REFRESH_ENDPOINTS = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh',
    '/auth/otp',
    '/auth/google',
];

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const { data } = await apiClient.post<{ accessToken: string }>(
        '/auth/refresh',
        { refreshToken }
    );

    await updateAccessToken(data.accessToken);
    apiClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    return data.accessToken;
}

async function handleLogoutAndRedirect() {
    await deleteTokens();
    delete apiClient.defaults.headers.common.Authorization;
    const { useAuthStore } = await import('../store/auth-store');
    useAuthStore.getState().clearSession();
    router.replace('/(auth)/login');
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const url = originalRequest?.url ?? '';
        const shouldSkip = SKIP_REFRESH_ENDPOINTS.some((path) => url.includes(path));

        if (status === 401 && !shouldSkip && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken().finally(() => {
                        refreshPromise = null;
                    });
                }
                const newAccessToken = await refreshPromise;

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                await handleLogoutAndRedirect();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);



apiClient.interceptors.request.use((req) => {
    // const token = getStoredToken();
    const token = "this_is_my_secret_token";
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
})
