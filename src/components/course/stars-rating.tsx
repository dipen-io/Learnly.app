// src/components/course/stars-rating.tsx

import { useTheme } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StarsRatingProps {
    rating: number;
    count?: number;
    size?: number;
    showCount?: boolean;
}

export function StarsRating({
    rating,
    count,
    size = 12,
    showCount = true,
}: StarsRatingProps) {
    const { colors, fontSizes } = useTheme();
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    return (
        <View style={styles.container}>
            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((i) => {
                    let name: keyof typeof Ionicons.glyphMap = 'star-outline';
                    if (i <= fullStars) name = 'star';
                    else if (i === fullStars + 1 && hasHalf) name = 'star-half-outline';

                    return (
                        <Ionicons
                            key={i}
                            name={name}
                            size={size}
                            color={colors.warning}
                            style={{ marginRight: 1 }}
                        />
                    );
                })}
            </View>

            <ThemedText
                style={{
                    fontSize: fontSizes.xs,
                    color: colors.textMuted,
                    marginLeft: 4,
                }}
            >
                {rating.toFixed(1)}
            </ThemedText>

            {showCount && count !== undefined && (
                <ThemedText
                    style={{
                        fontSize: fontSizes.xs,
                        color: colors.textMuted,
                        marginLeft: 2,
                    }}
                >
                    ({count > 999 ? `${(count / 1000).toFixed(1)}k` : count})
                </ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row',
    },
});