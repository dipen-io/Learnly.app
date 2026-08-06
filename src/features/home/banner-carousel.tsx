// src/features/home/banner-carousel.tsx

import { radii, spacing, useTheme } from "@/constants/theme";
import type { Banner } from "@/src/types/banner";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { useBanners } from "./use-home-sections";

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = spacing.sm;
const SIDE_INSET = spacing.lg;

const BANNER_WIDTH = SCREEN_WIDTH - SIDE_INSET * 2;
const BANNER_HEIGHT = 150;
const SNAP_INTERVAL = BANNER_WIDTH + GAP;

export function BannerCarousel() {
    const router = useRouter();
    const { colors } = useTheme();
    const { data: banners, isLoading, isError } = useBanners();
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);

    // Explicit snap stops, one per card. Every stop except the last is a
    // plain multiple of SNAP_INTERVAL — that's what produces the peek of
    // the next card, and it's fine to leave those as-is. The LAST stop is
    // calculated directly from the real content width instead, so it lands
    // the final card flush with zero leftover dead space, regardless of
    // how many banners there are or what SCREEN_WIDTH happens to be.
    const snapOffsets = useMemo(() => {
        if (!banners || banners.length === 0) return [];

        const count = banners.length;
        const contentWidth =
            SIDE_INSET * 2 + count * BANNER_WIDTH + (count - 1) * GAP;
        const maxScrollOffset = Math.max(0, contentWidth - SCREEN_WIDTH);

        return banners.map((_, i) =>
            i === count - 1 ? maxScrollOffset : SNAP_INTERVAL * i
        );
    }, [banners]);

    if (isError || (!isLoading && (!banners || banners.length === 0))) {
        return null;
    }

    if (isLoading) {
        return (
            <View
                style={[
                    styles.skeleton,
                    {
                        backgroundColor: colors.surface,
                        marginHorizontal: SIDE_INSET,
                    },
                ]}
            />
        );
    }

    const handlePress = useCallback((banner: Banner) => {
        switch (banner.linkType) {
            case 'course':
                router.push(`/course/${banner.linkValue}`);
                break;
            case 'category':
                router.push({
                    pathname: '/(tabs)/explore',
                    params: { category: banner.linkValue },
                });
                break;
            case 'url':
                break;
        }
    }, [router]);

    const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.x;
        // Find the closest snap stop rather than dividing by a fixed
        // interval, since the last stop is no longer evenly spaced.
        let closestIndex = 0;
        let closestDistance = Infinity;
        snapOffsets.forEach((stop, i) => {
            const distance = Math.abs(offset - stop);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });
        setActiveIndex(closestIndex);
    }, [snapOffsets]);

    return (
        <View style={{ marginBottom: spacing.lg }}>
            <FlatList
                ref={listRef}
                data={banners}
                keyExtractor={(item) => item.id}
                horizontal
                snapToOffsets={snapOffsets}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: SIDE_INSET,
                    paddingRight: SIDE_INSET,
                }}
                ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
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
                                        i === activeIndex
                                            ? colors.primary
                                            : colors.border,
                                },
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
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
