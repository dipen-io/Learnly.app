// src/types/cart.ts

export type CartItem = {
    courseId: string;
    title: string;
    price: number;
    thumbnailUrl: string;
    addedAt: string; // ISO date string
}