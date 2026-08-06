// src/features/home/banner-carousel.tsx

import { radii, spacing, useTheme } from "@/constants/theme";
import { BannerCard } from "@/src/components/bannerCard";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View
} from "react-native";
import { useBanners } from "./use-home-sections";

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = spacing.sm;
const SIDE_INSET = spacing.lg;

const BANNER_WIDTH = SCREEN_WIDTH - SIDE_INSET * 2;
const BANNER_HEIGHT = 150;
const SNAP_INTERVAL = BANNER_WIDTH + GAP;
const AUTO_PLAY_INTERVAL = 4000;


export function BannerCarousel() {
    const { colors } = useTheme();
    const { data: banners, isLoading, isError } = useBanners();
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    const stopAutoPlay = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startAutoPlay = useCallback(() => {
        stopAutoPlay();
        if (!banners || banners.length <= 1) return;

        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => {
                const nextIndex = (prev + 1) % banners.length;
                listRef.current?.scrollToOffset({
                    offset: snapOffsets[nextIndex],
                    animated: true,
                });
                return nextIndex;
            });
        }, AUTO_PLAY_INTERVAL);
    }, [banners, snapOffsets, stopAutoPlay]);

    // Start timer on mount / when banners load
    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [startAutoPlay, stopAutoPlay]);

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

    // When user drags, pause timer. When scroll settles, update dot + restart timer.
    const handleMomentumScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.x;
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
        startAutoPlay(); // ← restart the timer after manual swipe
    }, [snapOffsets, startAutoPlay]);

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
                onMomentumScrollEnd={handleMomentumScrollEnd}
                scrollEventThrottle={16}
                onScrollBeginDrag={stopAutoPlay}
                renderItem={({ item }) => <BannerCard banner={item} />}
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