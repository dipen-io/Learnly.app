//src/data/dummy-progress.ts

import { inProgressCourse } from "../types/course-progress";

export const dummyProgress: inProgressCourse[] = [
    {
        id: 'prog-001',
        courseId: 'course-python-fundamentals',
        title: 'Python Fundamentals',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
        completedLessons: 12,
        totalLessons: 30,
        lastAccessedAt: '2026-08-05T14:30:00Z',
    },
    {
        id: 'prog-002',
        courseId: 'course-react-native-2026',
        title: 'React Native Masterclass',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80',
        completedLessons: 5,
        totalLessons: 20,
        lastAccessedAt: '2026-08-06T10:15:00Z',
    },
]