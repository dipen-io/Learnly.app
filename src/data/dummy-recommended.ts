//src/data/dummy-recommended.ts

import { Course } from '@/src/types/course';

export const personalizedCourses: Course[] = [
    {
        id: 'rec-001',
        title: 'Advanced React Patterns',
        instructorName: 'Kent C. Dodds',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
        rating: 4.9,
        reviewCount: 2100,
        price: 19.99,
        originalPrice: 89.99,
        category: 'Development',
        description: '',
        studentCout: 0
    },
    {
        id: 'rec-002',
        title: 'Figma to Code Workflow',
        instructorName: 'Kevin Powell',
        thumbnailUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80',
        rating: 4.7,
        reviewCount: 1500,
        price: 14.99,
        category: 'Design',
        description: '',
        studentCout: 0
    },
    {
        id: 'rec-003',
        title: 'Machine Learning A-Z',
        instructorName: 'Kirill Eremenko',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
        rating: 4.8,
        reviewCount: 18500,
        price: 12.99,
        originalPrice: 94.99,
        category: 'Data Science',
        description: '',
        studentCout: 0
    },
    {
        id: 'rec-004',
        title: 'Public Speaking Mastery',
        instructorName: 'Chris Anderson',
        thumbnailUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf87744?w=600&q=80',
        rating: 4.6,
        reviewCount: 3200,
        price: 0,
        category: 'Business',
        description: '',
        studentCout: 0
    },
];

export const popularCourses: Course[] = [
    {
        id: 'pop-001',
        title: 'The Complete Web Developer',
        instructorName: 'Andrei Neagoie',
        thumbnailUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
        rating: 4.8,
        reviewCount: 42000,
        price: 13.99,
        originalPrice: 89.99,
        category: 'Development',
        description: '',
        studentCout: 0
    },
    {
        id: 'pop-002',
        title: 'Digital Marketing Strategy',
        instructorName: 'Seth Godin',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        rating: 4.5,
        reviewCount: 8900,
        price: 11.99,
        category: 'Marketing',
        description: '',
        studentCout: 0
    },
    {
        id: 'pop-003',
        title: 'Photography for Beginners',
        instructorName: 'Phil Ebiner',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
        rating: 4.7,
        reviewCount: 12400,
        price: 10.99,
        originalPrice: 49.99,
        category: 'Photography',
        description: '',
        studentCout: 0
    },
    {
        id: 'pop-004',
        title: 'Excel from Zero to Hero',
        instructorName: 'Maven Analytics',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        rating: 4.8,
        reviewCount: 5600,
        price: 0,
        category: 'Business',
        description: '',
        studentCout: 0
    },
];