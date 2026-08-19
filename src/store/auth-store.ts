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
    signup: (email: string, password: string) => Promise<void>;
    requestEmailOtp: (email: string) => Promise<void>;
    verifyEmailOtp: (email: string, code: string) => Promise<void>;
    saveNewPassword: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (idToken: string) => Promise<void>;
    logout: () => Promise<void>;
    //called internally by client.ts 's interceptor when a refresh is fialed
    // refresh token expired/invalid 
    clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    // Shared tail for every "user is now authenticated" path. Only touches
    // tokens + this store's own state — nothing cart-related here anymore.
    async function completeAuth(
        accessToken: string,
        refreshToken: string,
        user: User
    ) {
        await saveToken(accessToken, refreshToken);
        console.log("savedToken... done");
        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        console.log("apiclient accesstoken setting... done");
        set({ user, isAuthenticated: true });
        console.log("setUser... done");
    }

    return {
        user: null,
        isAuthenticated: false,
        isHydrated: false,

        hydrate: async () => {
            const accessToken = await getAccessToken();
            if (accessToken) {
                apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                set({ isAuthenticated: true, isHydrated: true });
            } else {
                set({ isHydrated: true });
            }
        },

        login: async (email, password) => {
            const { accessToken, refreshToken, data: user } = await authApi.login(
                email,
                password
            );
            console.log("FROM LOGIN: ", accessToken, user);
            await completeAuth(accessToken, "refreshTokenIsnull", user);
        },

        signup: async (email, password) => {
            const { accessToken, refreshToken, user } = await authApi.signup(
                email,
                password
            );
            await completeAuth(accessToken, refreshToken, user);
        },

        requestEmailOtp: async (email) => {
            await authApi.requestOtp(email);
        },

        verifyEmailOtp: async (email, code) => {
            const { accessToken, refreshToken, user } = await authApi.verifyOtp(
                email,
                code
            );
            await completeAuth(accessToken, refreshToken, user);
        },

        saveNewPassword: async (email, password) => {
            await authApi.saveNewPass(email, password);
        },

        loginWithGoogle: async (idToken) => {
            const { accessToken, refreshToken, user } = await authApi.googleLogin(
                idToken
            );
            await completeAuth(accessToken, refreshToken, user);
        },

        logout: async () => {
            await deleteTokens();
            delete apiClient.defaults.headers.common.Authorization;
            set({ user: null, isAuthenticated: false });
        },

        // Called by client.ts's interceptor when a token refresh fails.
        clearSession: () => {
            delete apiClient.defaults.headers.common.Authorization;
            set({ user: null, isAuthenticated: false });
        },
    };
});

/*
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

    requestEmailOtp: async(email) => {
        await authApi.requestOtp(email);
    },

    verifyEmailOtp: async(email, code) => {
        const { accessToken, refreshToken} = await authApi.verifyOtp(email, code);
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

*/