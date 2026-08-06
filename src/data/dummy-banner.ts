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
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.FFMK3rTBCxEQ7kG84kH0LQHaDe%3Fr%3D0%26pid%3DApi&f=1&ipt=49b9f6170f150cdbdff7e5edaa1e16785c1fe7187a045032437303b83890d997&ipo=images',
        title: 'Summer Sale — 40% Off',
        subtitle: 'Limited time offer on all data science courses.',
        linkType: 'url',
        linkValue: 'https://studylab.app/sale',
    },
    {
        id: 'banner-004',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.Uz9y8vXdykYQiIF7fWnL2gHaEJ%3Fr%3D0%26pid%3DApi&f=1&ipt=3ab766d888b771511349010e3e916a383b2e2ca5c9ec80b918db4a800b746daa&ipo=images',

        title: 'React Native Masterclass',
        subtitle: 'Build production-ready mobile apps with Expo.',
        linkType: 'course',
        linkValue: 'course-react-native-2026',
    },
];