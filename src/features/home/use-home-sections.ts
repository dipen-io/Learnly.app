import { dummyBanners } from "@/src/data/dummy-banner";
import { dummyCategories } from "@/src/data/dummy-categories";
import { dummyFeaturedCourses } from "@/src/data/dummy-featured-courses";
import { dummyFreeCourses } from "@/src/data/dummy-free-courses";
import { dummyProgress } from "@/src/data/dummy-progress";
import { popularCourses } from "@/src/data/dummy-recommended";
import { dummyRecommendedCourses } from "@/src/data/dummy-recommended-courses";
import { dummyTrending } from "@/src/data/dummy-trending";
import { useAuthStore } from "@/src/store/auth-store";

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

export function usePopularCourses() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    return {
        data: popularCourses,
        isLoading: false,
        isError: false,
    }
}

export function useTrendingCourses() {
    return {
        data: dummyTrending,
        isLoading: false,
        isError: false,
    }
}

export function useFreeCourses() {
    return {
        data: dummyFreeCourses,
        isLoading: false,
        isError: false,
    }
}

export function useRecommendedCourses() {
    // TODO: Replace with real API when backend is ready
    // For now, return dummy data
    return {
        data: dummyRecommendedCourses,
        isLoading: false,
        isError: false,
    };

    // Real implementation:
    // return useQuery({
    //   queryKey: homeKeys.recommended(),
    //   queryFn: homeApi.getRecommendedCourses,
    //   staleTime: 1000 * 60 * 5,
    // });
}