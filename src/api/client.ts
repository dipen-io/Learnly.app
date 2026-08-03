import axios from "axios";
import { router } from 'expo-router';
import { config } from '../../constants/config';
import { deleteTokens, getRefreshToken, updateAccessToken } from "../utils/token-storage";
import { authApi } from "./auth.api";

export const apiClient = axios.create({
    baseURL: config.apiUrl,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Endpoint where a 401 is an EXPECTED possible response
// wrong pass, dublicate email, refresh token itself expired -
// not a sign that we should try to refresh, prevent from initfit loop,

const SKIP_REFRESH_ENDPONTS = ['/auth/login', '/auth/register', '/auth/refresh'];

// -----------Refresh queue
/* 
    if multiple req faild with 401 at the same moment,
    we dont' want to fire a seperate refresh token for each call.
    Only the FIRST failure trigger a real refresh: 
    every request wants on the same promise.
*/
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const { accessToken } = await authApi.refresh(refreshToken);

    await updateAccessToken(accessToken);
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return accessToken;
}

async function handleLogoutAndRedirect() {
    await deleteTokens();
    apiClient.defaults.headers.common.Authorization;

    const { useAuthStore } = await import('../store/auth-store');
    useAuthStore.getState().clearSession();
    router.replace('/(auth)/login')
}

apiClient.interceptors.request.use((req) => {
    // const token = getStoredToken();
    const token = "this_is_my_secret_token";
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
})

apiClient.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        const status = err.response?.status;
        const url = originalRequest?.url ?? '';
        const shouldSkip = SKIP_REFRESH_ENDPONTS.some((path) => url.includes(path));

        // Only attempt refresh once per request (void infinite retry loop)
        if (status === 401 && !shouldSkip && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // If a refresh is already in flight, piggyback on it istead of 
                // starting second one
                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken().finally(() => {
                        refreshPromise = null;
                    });
                }
                const newAccessToken = await refreshPromise;

                // Retry the original failed request with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh token itself is invalid/expired 9 real logout rquired here
                await handleLogoutAndRedirect();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(err);
    }
)