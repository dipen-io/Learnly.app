//src/types/banner.ts

export type Banner = {
    id: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    // type: string;
    type: 'hero_carousel' | 'promo_strip' | 'announcement' | 'course_featured';

    position: string;
    priority: number;
    content: Record<string, any>;

    // Where tapping the banner should go — a course, a category, or an
    // external URL (e.g. a blog post about a sale).
    //     linkType: 'course' | 'category' | 'url';
    //     linkValue: string;
}