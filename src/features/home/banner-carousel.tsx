//src/features/home/banner-carousel.tsx

import { radii, spacing, useTheme } from "@/constants/theme";
import type { Banner } from "@/src/types/banner";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet, View } from "react-native";
import { useBanners } from "./use-home-sections";

const SCREEN_WIDTH = Dimensions.get('window').width;
const BANNER_WIDTH = SCREEN_WIDTH - spacing.lg * 2;
const BANNER_HEIGHT = 150;

export function BannerCarousel() {
    const router = useRouter();
    const { colors } = useTheme();
    const { data: banners, isLoading, isError } = useBanners();
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);

    if (isError || (!isLoading && (!banners || banners.length === 0))) {
        return null;
    }

    if (isLoading) {
        return (
            <View
                style={[styles.skeleton, { backgroundColor: colors.surface, marginHorizontal: spacing.lg }]}
            ></View>
        )
    }

    const handlePress = (banner: Banner) => {
        switch (banner.linkType) {
            case 'course':
                router.push(`/course/${banner.linkValue}`);
                break;

            case 'category':
                router.push({
                    pathname: `/(tabs)/explore`,
                    params: { category: banner.linkValue },
                });
                break;

            case 'url':
                break;
        }
    }

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_WIDTH + spacing.sm)
        );
        setActiveIndex(index);
    };

    return (
        <View style={{ marginBottom: spacing.lg }}>
            <FlatList
                ref={listRef}
                data={banners}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                snapToInterval={BANNER_WIDTH + spacing.sm}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: spacing.lg }}
                ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item)}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.banner}
                            resizeMode="cover"
                        />
                    </Pressable>
                )}
            />

            {banners && banners.length > 1 && (
                <View style={styles.dotsRow}>
                    {banners.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor:
                                        i === activeIndex ? colors.primary : colors.border,
                                },
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    banner: {
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,
        borderRadius: radii.md,
    },
    skeleton: {
        height: BANNER_HEIGHT,
        borderRadius: radii.lg,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginTop: spacing.sm,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
