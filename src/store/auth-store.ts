// src/store/auth-store.ts

// Zustand = reactive in-memory state(what ur screen react)
// token-store.ts = disk persistence (what survices app restart)
// This store is the bridge between two
// auth.api.ts = only place that known http enpoint .


import { create } from "zustand";
import { authApi } from "../api/auth.api";
import { apiClient } from "../api/client";
import type { User } from "../types/user";
import { deleteToken, getToken, saveToken } from "../utils/token-storage";


type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean,
    isHydrated: boolean, // true once we've checked secure-store on app launce

    hydrate: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isHydrated: false,

    hydrate: async () => {
        const token = await getToken();
        if (token) {
            apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
            set({ token, isAuthenticated: true, isHydrated: true });
            //TODO: later will do this 
            // Optionally verify + refresh user in background:
            // authApi.me().then((user) => set({ user }));
        } else {
            set({ isHydrated: true });
        }
    },


    login: async (email, password) => {
        const { token, user } = await authApi.login(email, password);

        await saveToken(token);
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        set({ token, user, isAuthenticated: true });
    },

    signup: async (name, email, password) => {
        const { token, user } = await authApi.signup(name,
            email,
            password
        );

        await saveToken(token);
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        set({ token, user, isAuthenticated: true });
    },

    logout: async () => {
        await deleteToken();
        delete apiClient.defaults.headers.common.Authorization;
        set({ token: null, user: null, isAuthenticated: false });
    },
}));