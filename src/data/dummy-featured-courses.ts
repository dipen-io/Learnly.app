//src/data/dummy-featured-courses.ts

import { Course } from "../types/course";

export const dummyFeaturedCourses: Course[] = [
    {
        id: 'course-001',
        title: 'Complete Python Bootcamp',
        instructorName: 'Jose Portilla',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
        rating: 4.8,
        reviewCount: 12400,
        price: 12.99,
        originalPrice: 84.99,
        tag: 'Bestseller',
        category: 'Development',
        description: "",
        studentCout: 0
    },
    {
        id: 'course-002',
        title: 'UI/UX Design Masterclass',
        instructorName: 'Gary Simon',
        thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
        rating: 4.9,
        reviewCount: 3200,
        price: 14.99,
        originalPrice: 69.99,
        tag: 'New',
        category: 'Design',
        description: "",
        studentCout: 0
    },
    {
        id: 'course-003',
        title: 'Financial Analysis Fundamentals',
        instructorName: '365 Careers',
        thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
        rating: 4.7,
        reviewCount: 8900,
        price: 0,
        tag: 'Bestseller',
        category: 'Business',
        description: "",
        studentCout: 0
    },
    {
        id: 'course-004',
        title: 'React Native — The Practical Guide',
        instructorName: 'Maximilian S.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
        rating: 4.6,
        reviewCount: 5600,
        price: 16.99,
        originalPrice: 94.99,
        category: 'Development',
        description: "",
        studentCout: 0
    },
]