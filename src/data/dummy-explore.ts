// src/data/dummy-explore.ts

import { CategoryItem, Collection, Instructor } from '../types/explore';
import { dummyFeaturedCourses } from './dummy-featured-courses';
import { personalizedCourses } from './dummy-recommended';

export const exploreCategories: CategoryItem[] = [
    { id: 'cat-1', name: 'Development', slug: 'development', icon: '💻', courseCount: 142 },
    { id: 'cat-2', name: 'Design', slug: 'design', icon: '🎨', courseCount: 89 },
    { id: 'cat-3', name: 'Business', slug: 'business', icon: '💼', courseCount: 76 },
    { id: 'cat-4', name: 'Marketing', slug: 'marketing', icon: '📢', courseCount: 54 },
    { id: 'cat-5', name: 'Photography', slug: 'photography', icon: '📷', courseCount: 38 },
    { id: 'cat-6', name: 'Music', slug: 'music', icon: '🎵', courseCount: 29 },
    { id: 'cat-7', name: 'Data Science', slug: 'data-science', icon: '📊', courseCount: 67 },
    { id: 'cat-8', name: 'Personal Dev', slug: 'personal-development', icon: '🌱', courseCount: 45 },
];

export const curatedCollections: Collection[] = [
    {
        id: 'col-1',
        title: 'Get Hired in 2026',
        subtitle: 'The skills employers actually want',
        courses: dummyFeaturedCourses.slice(0, 3),
    },
    {
        id: 'col-2',
        title: 'Design Fundamentals',
        subtitle: 'Start with the basics, end with a portfolio',
        courses: personalizedCourses.slice(0, 3),
    },
    {
        id: 'col-3',
        title: 'Free This Week',
        subtitle: 'Top-rated courses at no cost',
        courses: dummyFeaturedCourses.filter((c) => c.price === 0),
    },
];

export const newCourses = dummyFeaturedCourses.map((c, i) => ({
    ...c,
    id: `new-${i}`,
    title: c.title.replace('2026', '2027'),
}));

export const topInstructors: Instructor[] = [
    {
        id: 'ins-1',
        name: 'Jose Portilla',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        title: 'Python Expert',
        courseCount: 12,
        avgRating: 4.8,
        studentCount: 450000,
    },
    {
        id: 'ins-2',
        name: 'Gary Simon',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        title: 'Design Lead',
        courseCount: 8,
        avgRating: 4.9,
        studentCount: 120000,
    },
    {
        id: 'ins-3',
        name: 'Maximilian S.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        title: 'Full-Stack Dev',
        courseCount: 15,
        avgRating: 4.7,
        studentCount: 380000,
    },
    {
        id: 'ins-4',
        name: 'Kirill Eremenko',
        avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
        title: 'Data Scientist',
        courseCount: 20,
        avgRating: 4.8,
        studentCount: 210000,
    },
];