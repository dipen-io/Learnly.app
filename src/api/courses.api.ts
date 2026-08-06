//src/api/courses.api.ts

import { Course, CourseDetails } from "../types/course";
import { ExploreFilters } from "../types/filter";
import { apiClient } from "./client";


export const coursesApi = {
    list: async (params?: ExploreFilters): Promise<Course[]> => {
        const { data } = await apiClient.get<Course[]>('/courses', { params });
        return data;
    },

    detail: async (courseId: string): Promise<CourseDetails> => {
        const { data } = await apiClient.get<CourseDetails>(`/courses/${courseId}`);
        return data;
    }
}