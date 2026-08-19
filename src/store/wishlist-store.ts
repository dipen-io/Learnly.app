// src/store/wishlist-store.tsx

import Toast from '@/constants/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { wishtlistApi } from '../api/wishlist.api';
import type { WishlistItem } from '../types/wishlist';
import { useAuthStore } from './auth-store';

type WishlistState = {
    items: WishlistItem[];
    isSyncing: boolean;

    addItem: (item: WishlistItem) => Promise<void>;
    removeItem: (courseId: string) => Promise<void>;
    toggleItem: (item: WishlistItem) => Promise<void>;
    clearWishlist: () => void;
    isInWishlist: (courseId: string) => boolean;
    mergeOnLogin: () => Promise<void>;
};

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            isSyncing: false,

            addItem: async (item) => {
                set((state) => {
                    if (state.items.some((i) => i.courseId === item.courseId)) {
                        return state;
                    }
                    return { items: [...state.items, item] };
                });

                const { isAuthenticated } = useAuthStore.getState();
                if (isAuthenticated) {
                    try {
                        await wishtlistApi.add(item.courseId);
                    } catch (err) {
                        set((state) => ({
                            items: state.items.filter((i) => i.courseId !== item.courseId),
                        }));
                        throw err;
                    }
                }
            },

            removeItem: async (courseId) => {
                const previousItems = get().items;
                set((state) => ({
                    items: state.items.filter((i) => i.courseId !== courseId),
                }));

                Toast.show('Removed from wishlist', 'success', '650');

                const { isAuthenticated } = useAuthStore.getState();
                if (isAuthenticated) {
                    try {
                        await wishtlistApi.remove(courseId);
                    } catch (err) {
                        set({ items: previousItems });
                        throw err;
                    }
                }
            },

            toggleItem: async (item) => {
                const isAlreadyInWishlist = get().isInWishlist(item.courseId);

                if (isAlreadyInWishlist) {
                    await get().removeItem(item.courseId);
                } else {
                    await get().addItem(item);
                    Toast.show('Added to wishlist', 'success', '650');
                }
            },

            clearWishlist: () => set({ items: [] }),

            // isInWishlist: (courseId) => 
            //     get().items?.some((i) => i.courseId === courseId),

            isInWishlist: (courseId) => {
                const items = get().items;
                if (!Array.isArray(items)) return false;
                return items.some((i) => i.courseId === courseId);
            },
            mergeOnLogin: async () => {
                const localItems = get().items;
                set({ isSyncing: true });
                try {
                    const mergedItems =
                        localItems.length > 0
                            ? await wishtlistApi.merge(localItems)
                            : await wishtlistApi.get();
                    set({ items: mergedItems });
                } finally {
                    set({ isSyncing: false });
                }
            },
        }),

        // {
        //     name: 'wishlist-storage',
        //     storage: createJSONStorage(() => AsyncStorage),
        //     // Add this to fix corrupted storage:
        //     onRehydrateStorage: () => (state) => {
        //         if (state && !Array.isArray(state.items)) {
        //             state.items = [];
        //         }
        //     },
        // }
        {
            name: 'wishlist-storage-v2', // <-- bump name to clear old corrupted storage
            storage: createJSONStorage(() => AsyncStorage),

            // Fix: sanitize anything that comes back from storage
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                if (!Array.isArray(state.items)) {
                    state.items = [];
                }
            },

            // Your auth logic: only persist for guests
            partialize: (state) => {
                const isAuth = useAuthStore.getState().isAuthenticated;
                // If logged in: persist nothing (or empty array)
                // If guest: persist only items
                return isAuth ? { items: [] } : { items: state.items };
            },
        }
    )
);

// --- Auth reactivity (identical to cart-store) -------------------------
let wasAuthenticated = useAuthStore.getState().isAuthenticated;

useAuthStore.subscribe((state) => {
    const isAuthenticated = state.isAuthenticated;

    if (isAuthenticated && !wasAuthenticated) {
        useWishlistStore.getState().mergeOnLogin();
    } else if (!isAuthenticated && wasAuthenticated) {
        useWishlistStore.getState().clearWishlist();
    }

    wasAuthenticated = isAuthenticated;
});