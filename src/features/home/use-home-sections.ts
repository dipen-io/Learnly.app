import { homeApi } from "@/src/api/home.api";
import { useQuery } from "@tanstack/react-query";

export function useBanners() {
    return useQuery({
        queryKey: ['home', 'banners'],
        queryFn: homeApi.banners,
        staleTime: 1000 * 60 * 30,
    });
}

export function useCategories() {
    return useQuery({
        queryKey: ['home', 'categories'],
        queryFn: homeApi.categories,
        staleTime: 1000 * 60 * 60,
    });
}