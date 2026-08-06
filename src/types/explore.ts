// src/types/explore.ts

import { Course } from "./course";

export type CategoryItem = {
    id: string;
    name: string;
    slug: string;
    icon: string;
    courseCount: number;
};

export type Collection = {
    id: string;
    title: string;
    subtitle: string;
    courses: Course[]
};

export type Instructor = {
    id: string;
    name: string;
    avatarUrl: string;
    title: string;
    courseCount: number;
    avgRating: number;
    studentCount: number;
}