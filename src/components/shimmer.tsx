//src/components/shimmer.tsx

import { useTheme } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

interface ShimmerProps {
    width: number;
    height: number;
    borderRadius?: number;
}

export function Shimmer({ width, height, borderRadius = 0 }: ShimmerProps) {
    const { colors, isDark } = useTheme();
    const translateX = useSharedValue(-width);

    React.useEffect(() => {
        translateX.value = withRepeat(
            withTiming(width, { duration: 1500 }),
            -1,
            false
        );
    }, [width, translateX]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    // Shimmer colors: surface base + a lighter/darker highlight band
    const baseColor = colors.surface;
    const highlightColor = isDark ? '#2A302D' : '#FFFFFF'

    return (
        <View
            style={[
                styles.container,
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: baseColor,
                    overflow: 'hidden',
                },
            ]}
        >
            <Animated.View
                style={[
                    styles.shimmerBand,
                    animatedStyle,
                    {
                        width: width * 0.4,
                        height,
                        backgroundColor: highlightColor,
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    shimmerBand: {
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.15,
        transform: [{ skewX: '-20deg' }],
    },
});