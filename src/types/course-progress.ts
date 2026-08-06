//src/types/course-progress.ts

export type inProgressCourse = {
    id: string;
    courseId: string;
    title: string;
    thumbnailUrl: string;
    completedLessons: number;
    totalLessons: number;
    lastAccessedAt: string; //ISO string
}