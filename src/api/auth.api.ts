//src/api/auth.api.ts
//
// Only file that knows the actual andpoint paths and request/resonse shape
// for auth.

import type { User } from "../types/user";
import { apiClient } from "./client";

type AuthResponse = {
    refreshToken: string;
    user: User;
    accessToken: string;
};

type RefreshResponse = {
    accessToken: string;
}

export const authApi = {

    //////////////////LOGIN
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', {
            email, password
        });
        return data;
    },

    ////////////////// REGISTER,
    signup: async (
        name: string,
        email: string,
        password: string
    ): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>('/auth/register', {
            name, email, password
        });
        return data;
    },

    ////////////////////// REFRESH 
    refresh: async (refreshToken: string): Promise<RefreshResponse> => {
        /*
        Note: intentionally NOt using the shared apiClient here - that
        instance/s interceptor is what called refresh() in the first place.
        */
        const { data } = await apiClient.post<RefreshResponse>('/api/refresh', {
            refreshToken,
        });
        return data;
    },

    ////////////////////// ME
    me: async (): Promise<User> => {
        const { data } = await apiClient.get<User>('/me');
        return data;
    },
};