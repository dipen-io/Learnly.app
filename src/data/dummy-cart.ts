import type { CartItem } from '@/src/types/cart';

export const dummyCartItems: CartItem[] = [
    {
        courseId: 'course-001',
        title: 'Complete React Native Bootcamp 2024',
        price: 19.99,
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
        addedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    },
    {
        courseId: 'course-002',
        title: 'NestJS Microservices Architecture Masterclass',
        price: 24.99,
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        addedAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    },
    {
        courseId: 'course-003',
        title: 'UI/UX Design Principles for Mobile Apps',
        price: 14.99,
        thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        addedAt: new Date().toISOString(), // today
    },
];