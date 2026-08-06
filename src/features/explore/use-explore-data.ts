// src/features/explore/use-explore-data.ts

import { coursesApi } from "@/src/api/courses.api";
import type { ExploreFilters } from "@/src/types/filter";
import { useQuery } from "@tanstack/react-query";


export function useExploreCourses(filters: ExploreFilters) {
    return useQuery({
        queryKey: ['explore', 'courses', 'filters'],
        queryFn: () => coursesApi.list(filters),
        enabled: Object.keys(filters).length > 0,
    });
}

// Discovery-state only — a fixed, cheap query (just needs the backend
// to support sortBy: 'newest'), no user-controlled filters involved.

export function useNewAndNotworthy() {
    return useQuery({
        queryKey: ['explore', 'new-and-noteworthy'],
        queryFn: () => coursesApi.list({ sortBy: 'newest' }),
        staleTime: 1000 * 60 * 15,
    });
}