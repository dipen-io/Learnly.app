// src/store/cart-store.ts

// Guest: cart lives ONLY in local storage(AsyncStorage, via zustand perisist middleware) -no acount needed
//Logged-in: every add/remove also calls the server , local state just mirros it for fast reads


import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { cartApi } from "../api/cart.api";
import type { CartItem } from "../types/cart";
import { useAuthStore } from "./auth-store";

type CartState = {
    items: CartItem[];
    isSyncing: boolean;

    addItem: (item: CartItem) => Promise<void>;
    removeItem: (courseId: string) => Promise<void>;
    clearCart: () => void;
    isInCart: (courseId: string) => boolean;

    // Called right after auto-store's login/signup resolve,
    mergeOnLogin: () => Promise<void>;

};

export const useCartSore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isSyncing: false,

            addItem: async (item) => {
                set((state) => {
                    if (state.items.some((i) => i.courseId === item.courseId)) {
                        return state; // already in cart , no dublicate
                    }
                    return { items: [...state.items, item] };
                });
                const { isAuthenticated } = useAuthStore.getState();
                if (isAuthenticated) {
                    try {
                        await cartApi.add(item.courseId);

                    } catch (error) {
                        set((state) => ({
                            items: state.items.filter((i) => i.courseId !== item.courseId)
                        }));
                        throw error;
                    }
                }
            },

            removeItem: async (couseId) => {
                const previousItems = get().items;
                set((state) => ({
                    items: state.items.filter((i) => i.courseId !== couseId),
                }))

                const { isAuthenticated } = useAuthStore.getState();
                if (isAuthenticated) {
                    try {
                        await cartApi.remove(couseId);
                    } catch (error) {
                        set({ items: previousItems });
                        throw error;
                    }
                }
            },

            clearCart: () => set({ items: [] }),

            isInCart: (courseId) => get().items.some((i) => i.courseId === courseId),

            mergeOnLogin: async () => { }
        }),
        {
            name: 'card-storage', // AsyncStorage key
            storage: createJSONStorage(() => AsyncStorage),
            // Only persist guest cars to disk - once logged in ,sever is the 
            // source of thuth and we don't need a local disk copy
            partialize: (state) => {
                useAuthStore.getState().isAuthenticated ? { items: [] } : state
            }
        }

    )
)