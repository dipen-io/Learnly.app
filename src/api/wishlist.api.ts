// src/api/wishlist-api.ts

import { apiClient } from "./client";

export const wishtlistApi = {
    get: async () => {
        const { data } = await apiClient.get('/wishlist');
        return data;
    },

    add: async (couseId: string) => {
        const { data } = await apiClient.post('/wishlist', { couseId });
        return data;
    },

    remove: async (courseId: string) => {
        const { data } = await apiClient.delete(`/wishlist/${courseId}`);
        return data;
    },

    toggle: async (courseId: string) => {
        const { data } = await apiClient.post('/wishlist/toggle', { courseId });
        return data;
    },

    merge: async (localItem: { courseId: string }[]) => {
        const { data } = await apiClient.post('/wishlist/merge', { items: localItem });
        return data;
    },

    check: async (courseId: string) => {
        const { data } = await apiClient.get(`/wishlist/check/${courseId}`);
        return data;
    }
}