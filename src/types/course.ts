//src/types/course.ts

export type Course = {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    thumbnailUrl: string;
    instructorName: string;
    rating: number;
    reviewCount: number;
    studentCout: number;
    tag?: string;
    category: string;
};

export type CourseDetails = Course & {
    curriculum: Section[];
    previewVideoUrl: string;
};

export type Section = {
    id: string;
    title: string;
    lessons: Lesson[];

};

export type Lesson = {
    id: string;
    title: string;
    durationSeconds: string;
    idPreview: boolean;
}
