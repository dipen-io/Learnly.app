// src/api/home.api.ts

import type { Banner } from '../types/banner';
import type { Category } from '../types/category';
import { apiClient } from './client';

export const homeApi = {
    banners: async (): Promise<Banner[]> => {
        const { data } = await apiClient.get<Banner[]>('/banners?position=home_top');
        return data;
    },

    categories: async (): Promise<Category[]> => {
        const { data } = await apiClient.get<Category[]>('/categories');
        return data;
    },
};