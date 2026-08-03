//src/types/course.ts

export type Course = {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnailUrl: string;
    instructorName: string;
    rating: number;
    studentCout: number;
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
