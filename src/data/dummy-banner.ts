// src/data/dummy-banners.ts

import { Banner } from '@/src/types/banner';

export const dummyBanners: Banner[] = [
    {
        id: 'banner-001',
        imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
        title: 'Master Python in 30 Days',
        subtitle: 'From zero to building real projects. New cohort starts Monday.',
        linkType: 'course',
        linkValue: 'course-python-fundamentals',
    },
    {
        id: 'banner-002',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',

        title: 'Design Systems Deep Dive',
        subtitle: 'Learn how top teams build scalable UI libraries.',
        linkType: 'category',
        linkValue: 'design',
    },
    {
        id: 'banner-003',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        title: 'Summer Sale — 40% Off',
        subtitle: 'Limited time offer on all data science courses.',
        linkType: 'url',
        linkValue: 'https://studylab.app/sale',
    },
    {
        id: 'banner-004',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',

        title: 'React Native Masterclass',
        subtitle: 'Build production-ready mobile apps with Expo.',
        linkType: 'course',
        linkValue: 'course-react-native-2026',
    },
];