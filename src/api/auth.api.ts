//src/api/auth.api.ts
//
// Only file that knows the actual andpoint paths and request/resonse shape
// for auth.

import type { ApiResponse, User } from "../types/user";
import { apiClient } from "./client";

type AuthResponse = {
    refreshToken: string;
    data: User;
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
        email: string,
        password: string
    ): Promise<AuthResponse> => {
        console.log("creating account....", email, password)
        const { data } = await apiClient.post<AuthResponse>('/auth/create-new-user', {
            email, password
        });
        console.log("HW", data);
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
        console.log("/user/me ................")
        try {
            const response = await apiClient.get<ApiResponse<User>>('/users/me');
            return response.data.data;
        } catch (error) {
            // console.log("ME FAILED:", error?.response?.status, error?.message);
            // console.log("ME URL:", error?.config?.url);
            throw error; // <-- re-throw!
        }

    },


    ///////////// PasswordLess Login(email, OTP)
    // request OTP 6-digit code to the given email. Backends should create 
    // account or hold the email until verify
    requestOtp: async (email: string): Promise<void> => {
        await apiClient.post('/auth/otp/request', { email });
    },

    verifyOtp: async (email: string, code: string): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>('/auth/otp/verify', {
            email, code,
        });
        return data;
    },

    ////////////////Google 
    //idToken comes from the Google sign-in flow on the client
    googleLogin: async (idToken: string): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>('/auth/google', {
            idToken
        })

        return data;
    },

    //////////////Save New Password 
    saveNewPass: async (email: string, password: string): Promise<void> => {
        await apiClient.post('/auth/new-password/save', { email, password });
    }
};
