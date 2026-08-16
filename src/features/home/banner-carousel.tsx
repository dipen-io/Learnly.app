import { spacing, useTheme } from "@/constants/theme";
import { BannerCard } from "@/src/components/bannerCard";
import { Banner } from "@/src/types/banner";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = spacing.sm;
const SIDE_INSET = spacing.lg;

const BANNER_WIDTH = SCREEN_WIDTH - SIDE_INSET * 2;
const BANNER_HEIGHT = 150;
const SNAP_INTERVAL = BANNER_WIDTH + GAP;

interface BannerCarouselProps {
    banner: Banner;
}

export function BannerCarousel({ banner }: BannerCarouselProps) {
    const { colors } = useTheme();
    const slides = banner.content.slides;
    const autoPlayInterval = banner.content.autoPlayInterval ?? 4000;

    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const snapOffsets = useMemo(() => {
        if (!slides || slides.length === 0) return [];
        const count = slides.length;
        const contentWidth = SIDE_INSET * 2 + count * BANNER_WIDTH + (count - 1) * GAP;
        const maxScrollOffset = Math.max(0, contentWidth - SCREEN_WIDTH);
        return slides.map((_: any, i: number) =>
            i === count - 1 ? maxScrollOffset : SNAP_INTERVAL * i
        );
    }, [slides]);

    const stopAutoPlay = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startAutoPlay = useCallback(() => {
        stopAutoPlay();
        if (!slides || slides.length <= 1) return;
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => {
                const nextIndex = (prev + 1) % slides.length;
                listRef.current?.scrollToOffset({
                    offset: snapOffsets[nextIndex],
                    animated: true,
                });
                return nextIndex;
            });
        }, autoPlayInterval);
    }, [slides, snapOffsets, stopAutoPlay, autoPlayInterval]);

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [startAutoPlay, stopAutoPlay]);

    if (!slides || slides.length === 0) return null;

    const handleMomentumScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.x;
        let closestIndex = 0;
        let closestDistance = Infinity;
        snapOffsets.forEach((stop: number, i: number) => {
            const distance = Math.abs(offset - stop);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });
        setActiveIndex(closestIndex);
        startAutoPlay();
    }, [snapOffsets, startAutoPlay]);

    return (
        <View style={{ marginBottom: spacing.lg }}>
            <FlatList
                ref={listRef}
                data={slides}
                keyExtractor={(_, i) => `${banner.id}-slide-${i}`}
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
                renderItem={({ item }) => (
                    <BannerCard
                        imageUrl={item.imageUrl}
                        title={item.title}
                        subtitle={item.subtitle}
                        bgColor={item.bgColor}
                        textColor={item.textColor}
                        cta={item.cta}
                    />
                )}
            />

            {slides.length > 1 && banner.content.showIndicators !== false && (
                <View style={styles.dotsRow}>
                    {slides.map((_: any, i: React.Key | null | undefined) => (
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
    );
}

const styles = StyleSheet.create({
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