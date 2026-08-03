// src/features/courses/use-courses.ts
//
// This is the pattern to copy for any other server-owned data
// (my-learning, orders, wishlist, etc.) — one hook per query, thin
// wrapper around useQuery, components just call the hook.

import { coursesApi } from '@/src/api/courses.api';
import { queryKeys } from '@/src/api/query-keys';
import { useQuery } from '@tanstack/react-query';


export function useCourses(params?: { category: string, search: string }) {
    return useQuery({
        queryKey: queryKeys.courses.list(params),
        queryFn: () => coursesApi.list(params),
    });
}

export function useCourseDetails(courseId: string) {
    return useQuery({
        queryKey: queryKeys.courses.detail(courseId),
        queryFn: () => coursesApi.detail(courseId),
        enabled: !!courseId, // dont fire unit we can couurseId
    })
}