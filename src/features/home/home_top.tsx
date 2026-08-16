import React from "react";
import { View } from "react-native";
import { AnnouncementBar } from "./announcement-bar";
import { BannerCarousel } from "./banner-carousel";
import { PromoStrip } from "./promo-strip";
import { useBanners } from "./use-home-sections";

export function Home_Top() {
    const { data: banners, isError, isLoading } = useBanners();

    if (isLoading || isError || !banners) return null;

    const homeTopBanners = banners
        .filter((b) => b.position === 'home_top')
        .sort((a, b) => a.priority - b.priority);

    return (
        <View>
            {homeTopBanners.map((banner) => {
                if (banner.type === 'hero_carousel') {
                    return <BannerCarousel key={banner.id} banner={banner} />;
                }
                if (banner.type === 'promo_strip') {
                    return <PromoStrip key={banner.id} content={banner.content} />;
                }
                if (banner.type === 'announcement') {
                    return <AnnouncementBar key={banner.id} content={banner.content} />;
                }
                return null;
            })}
        </View>
    );
}