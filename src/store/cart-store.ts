// src/store/cart-store.ts
//
// Guest: cart lives ONLY in local storage (AsyncStorage, via zustand's
//   persist middleware) — survives app restart, no account needed.
// Logged-in: every add/remove also calls the server, local state just
//   mirrors it for fast reads.
//
// This file imports auth-store (one direction only). At the bottom, it
// SUBSCRIBES to auth-store's isAuthenticated changes — merge fires when
// it flips false -> true (any login path: password, OTP, Google, all
// route through the same isAuthenticated flag), clear fires when it
// flips true -> false (logout, or a forced session-clear from the 401
// interceptor). auth-store itself has zero knowledge this file exists.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cartApi } from '../api/cart.api';
import type { CartItem } from '../types/cart';
import { useAuthStore } from './auth-store';

type CartState = {
    items: CartItem[];
    isSyncing: boolean;

    addItem: (item: CartItem) => Promise<void>;
    removeItem: (courseId: string) => Promise<void>;
    clearCart: () => void;
    isInCart: (courseId: string) => boolean;
    mergeOnLogin: () => Promise<void>;
};

export const useCartStore = create<CartState>()(
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
                        await cartApi.add(item.courseId);
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

                const { isAuthenticated } = useAuthStore.getState();
                if (isAuthenticated) {
                    try {
                        await cartApi.remove(courseId);
                    } catch (err) {
                        set({ items: previousItems });
                        throw err;
                    }
                }
            },

            clearCart: () => set({ items: [] }),

            isInCart: (courseId) =>
                get().items.some((i) => i.courseId === courseId),

            mergeOnLogin: async () => {
                const localItems = get().items;
                set({ isSyncing: true });
                try {
                    const mergedItems =
                        localItems.length > 0
                            ? await cartApi.merge(localItems)
                            : await cartApi.get();
                    set({ items: mergedItems });
                } finally {
                    set({ isSyncing: false });
                }
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) =>
                useAuthStore.getState().isAuthenticated ? { items: [] } : state,
        }
    )
);

// --- Auth reactivity ----------------------------------------------------
// This replaces the old approach where auth-store manually called into
// cart-store after login/logout. Now cart-store just watches auth state
// and reacts on its own — works identically for every auth path
// (password, OTP, Google) with zero duplication, and auth-store doesn't
// need to know cart-store exists.
let wasAuthenticated = useAuthStore.getState().isAuthenticated;

useAuthStore.subscribe((state) => {
    const isAuthenticated = state.isAuthenticated;

    if (isAuthenticated && !wasAuthenticated) {
        useCartStore.getState().mergeOnLogin();
    } else if (!isAuthenticated && wasAuthenticated) {
        useCartStore.getState().clearCart();
    }

    wasAuthenticated = isAuthenticated;
});