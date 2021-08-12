// src/features/account/use-account-section.tsx

import { dummyUserData } from "@/src/data/dummy-user";


export function useUsers() {
    // return useQuery({
    //     queryKey: ['home', 'banners'],
    //     queryFn: homeApi.banners,
    //     staleTime: 1000 * 60 * 30,
    // });
    return {
        data: dummyUserData,
        isLoading: false,
        isError: false,
    };
}