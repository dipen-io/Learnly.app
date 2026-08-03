//src/api/auth.api.ts
//
// Only file that knows the actual andpoint paths and request/resonse shape
// for auth.

import type { User } from "../types/user";
import { apiClient } from "./client";

type AuthResponse = {
    token: string;
    user: User;
};

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

    ////////////////////// ME
    me: async (): Promise<User> {
        const { data } = await apiClient.get<User>('/me');
        return data;
    },
};