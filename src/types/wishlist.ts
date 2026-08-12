// src/types/wishlist.ts

export type WishlistItem = {
    courseId: string;
    title: string;
    price: number;
    thumbnailUrl: string;
    instructor: string;
    addedAt: string; //ISO date string
}