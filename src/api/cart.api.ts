// src/api/cart.api.ts

import type { CartItem } from "../types/cart";
import { apiClient } from "./client";

export const cartApi = {
    get: async (): Promise<CartItem[]> => {
        const { data } = await apiClient.get('/cart');
        return data;
    },

    add: async (courseId: string): Promise<void> => {
        await apiClient.post('/cart/items', { courseId });

    },

    remove: async (courseId: string): Promise<void> => {
        await apiClient.delete(`/cart/items/${courseId}`);
    },

    // Called once, right after login/signup successds -- 
    // send whatever was int he guest's local cart so the server merge it
    // into their account 
    merge: async (items: CartItem[]): Promise<CartItem[]> => {
        const { data } = await apiClient.post<CartItem[]>('/cart/merge', { items })
        return data;
    }
}