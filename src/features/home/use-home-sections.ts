import { dummyBanners } from "@/src/data/dummy-banner";
import { dummyCategories } from "@/src/data/dummy-categories";
import { dummyFeaturedCourses } from "@/src/data/dummy-featured-courses";
import { dummyProgress } from "@/src/data/dummy-progress";

export function useBanners() {
    // return useQuery({
    //     queryKey: ['home', 'banners'],
    //     queryFn: homeApi.banners,
    //     staleTime: 1000 * 60 * 30,
    // });
    return {
        data: dummyBanners,
        isLoading: false,
        isError: false,
    };
}

export function useCategories() {
    // return useQuery({
    //     queryKey: ['home', 'categories'],
    //     queryFn: homeApi.categories,
    //     staleTime: 1000 * 60 * 60,
    // });

    return {
        data: dummyCategories,
        isLoading: false,
        isError: false,
    }
}

export function useContuneLearning() {
    return {
        data: dummyProgress,
        isLoading: false,
        isError: false,
    }
}

export function useFeaturedCourses() {
    return {
        data: dummyFeaturedCourses,
        isLoading: false,
        isError: false,
    }
}