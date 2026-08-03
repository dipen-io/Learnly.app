// src/store/auth-store.ts

// Zustand = reactive in-memory state(what ur screen react)
// token-store.ts = disk persistence (what survices app restart)
// This store is the bridge between two
// auth.api.ts = only place that known http enpoint .


import { create } from "zustand";
import { authApi } from "../api/auth.api";
import { apiClient } from "../api/client";
import type { User } from "../types/user";
import { deleteTokens, getAccessToken, saveToken } from "../utils/token-storage";


type AuthState = {
    user: User | null;
    // token: string | null,
    isAuthenticated: boolean,
    isHydrated: boolean, // true once we've checked secure-store on app launce

    hydrate: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    //called internally by client.ts 's interceptor when a refresh is fialed
    // refresh token expired/invalid 
    clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isHydrated: false,

    hydrate: async () => {
        const accessToken = await getAccessToken();
        if (accessToken) {
            apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            set({ isAuthenticated: true, isHydrated: true });
            //TODO: later will do this 
            // Optionally verify + refresh user in background:
            // authApi.me().then((user) => set({ user }));
        } else {
            set({ isHydrated: true });
        }
    },


    login: async (email, password) => {
        const { accessToken, refreshToken, user } = await authApi.login(email, password);

        await saveToken(accessToken, refreshToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        set({ user, isAuthenticated: true });
    },

    signup: async (name, email, password) => {
        const { accessToken, refreshToken, user } = await authApi.signup(name,
            email,
            password
        );

        await saveToken(accessToken, refreshToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        set({ user, isAuthenticated: true });
    },

    logout: async () => {
        await deleteTokens();
        delete apiClient.defaults.headers.common.Authorization;
        set({ user: null, isAuthenticated: false });
    },

    clearSession() {
        delete apiClient.defaults.headers.common.Authorization;
        set({ user: null, isAuthenticated: false });
    },
}));