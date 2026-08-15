import type { Banner } from '@/src/types/banner';

export const dummyBanners: Banner[] = [
    // ── Type 1: Hero Carousel ─────────────────────────────────────────────
    {
        id: 'banner-001',
        type: 'hero_carousel',
        position: 'home_top',
        priority: 0,
        content: {
            autoPlayInterval: 5000,
            showIndicators: true,
            slides: [
                {
                    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
                    title: 'Master Python in 30 Days',
                    subtitle: 'From zero to building real projects. New cohort starts Monday.',
                    bgColor: '#2F4F3E',
                    textColor: '#FFFFFF',
                    cta: {
                        label: 'Start Learning',
                        action: { type: 'screen', value: '/course/course-python-fundamentals' },
                    },
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
                    title: 'Design Systems Deep Dive',
                    subtitle: 'Learn how top teams build scalable UI libraries.',
                    bgColor: '#1C2321',
                    textColor: '#FFFFFF',
                    cta: {
                        label: 'Explore',
                        action: { type: 'screen', value: '/explore?category=design' },
                    },
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
                    title: 'React Native Masterclass',
                    subtitle: 'Build production-ready mobile apps with Expo.',
                    bgColor: '#0D6EFD',
                    textColor: '#FFFFFF',
                    cta: {
                        label: 'Enroll Now',
                        action: { type: 'screen', value: '/course/course-react-native-2026' },
                    },
                },
            ],
        },
        imageUrl: '',
        title: '',
        subtitle: '',
        linkType: 'course',
        linkValue: ''
    },

    // ── Type 2: Promo Strip ───────────────────────────────────────────────
    {
        id: 'banner-002',
        type: 'promo_strip',
        position: 'home_top',
        priority: 1,
        content: {
            message: 'Summer Sale — 40% off all Data Science courses',
            bgColor: '#F2A93B',
            textColor: '#1C2321',
            icon: 'sparkles',
            dismissible: true,
            cta: {
                label: 'Shop Sale',
                action: { type: 'screen', value: '/explore?category=data-science' },
            },
        },
        imageUrl: '',
        title: '',
        subtitle: '',
        linkType: 'course',
        linkValue: ''
    },

    // ── Type 3: Announcement ──────────────────────────────────────────────
    {
        id: 'banner-003',
        type: 'announcement',
        position: 'home_top',
        priority: 2,
        content: {
            message: 'App maintenance tonight 2:00–4:00 AM IST',
            severity: 'warning',
            dismissible: true,
            action: { type: 'none' },
        },
        imageUrl: '',
        title: '',
        subtitle: '',
        linkType: 'course',
        linkValue: ''
    },

    // ── Type 4: Course Featured ───────────────────────────────────────────
    {
        id: 'banner-004',
        type: 'course_featured',
        position: 'home_top',
        priority: 3,
        content: {
            title: 'Trending Now',
            layout: 'horizontal_scroll',
            courseIds: [
                'course-python-fundamentals',
                'course-react-native-2026',
                'course-ui-ux-masterclass',
                'course-nestjs-backend',
            ],
        },
        imageUrl: '',
        title: '',
        subtitle: '',
        linkType: 'course',
        linkValue: ''
    },
];