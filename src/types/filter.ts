//src/types/filter.ts

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type DurationBucket = 'short' | 'medium' | 'long';

export type PriceFilter = 'free' | 'paid' | 'on_sale';

export type SortBy = 'popular' | 'newest' | 'price_low' | 'price_high' | 'rating';

export type ExploreFilters = {
    category?: string;
    search?: string;
    sortBy?: SortBy;
    difficulty?: Difficulty;
    duration?: DurationBucket;
    price?: PriceFilter;
    minRating?: number;
}