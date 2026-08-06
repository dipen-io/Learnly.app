//src/data/dummy-trending.ts

import { Course } from "../types/course";

export type TrendingCourse = Course & {
    weeklyEnrollments: number;
    rank: number;
};

export const dummyTrending: TrendingCourse[] = [
    {
        id: 'trend-001',
        title: 'The Complete Python Bootcamp 2026',
        description: 'desc',
        instructorName: 'Jose Portilla',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80',
        rating: 4.8,
        studentCout: 33,
        reviewCount: 12400,
        price: 12.99,
        originalPrice: 12000,
        category: 'Development',
        weeklyEnrollments: 3420,
        rank: 1,
    },
    {
        id: 'trend-002',
        title: 'UI/UX Design Masterclass Pro',
        instructorName: 'Gary Simon',
        description: 'description',
        thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
        rating: 4.9,
        reviewCount: 3200,
        studentCout: 33,
        price: 14.99,
        category: 'Design',
        weeklyEnrollments: 2890,
        rank: 2,
    },
    {
        id: 'trend-003',
        title: 'Machine Learning A-Z: Hands-On',
        instructorName: 'Kirill Eremenko',
        description: 'description',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80',
        rating: 4.8,
        reviewCount: 18500,
        price: 12.99,
        studentCout: 33,
        category: 'Data Science',
        weeklyEnrollments: 2150,
        rank: 3,
    },
    {
        id: 'trend-004',
        title: 'React Native — The Practical Guide',
        instructorName: 'Maximilian S.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80',
        rating: 4.6,
        description: 'description',
        reviewCount: 5600,
        price: 16.99,
        studentCout: 33,
        category: 'Development',
        weeklyEnrollments: 1890,
        rank: 4,
    },
    {
        id: 'trend-005',
        title: 'Financial Analysis Fundamentals',
        instructorName: '365 Careers',
        thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
        rating: 4.7,
        reviewCount: 8900,
        studentCout: 33,
        description: 'description',
        price: 0,
        category: 'Business',
        weeklyEnrollments: 1540,
        rank: 5,
    },
]