// src/features/home/category-pill-list.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
// import { dummyCategories } from '@/src/data/dummy-categories';
import type { Category } from '@/src/types/category';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useCategories } from './use-home-sections';

export function CategoryPillList() {
    const router = useRouter();
    const { colors } = useTheme();
    const [activeSlug, setActiveSlug] = useState('all');

    const { data: dummyCategories, isLoading, isError } = useCategories();
    if (isError || isError) {
        return null;
    }

    const handlePress = useCallback((category: Category) => {
        setActiveSlug(category.slug);

        if (category.slug !== 'all') {
            router.push({
                pathname: '/(tabs)/explore',
                params: { category: category.slug },
            });
        }
    }, [router]);

    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
                snapToAlignment="start"
            >
                {dummyCategories.map((category) => {
                    const isActive = category.slug === activeSlug;

                    return (
                        <Pressable
                            key={category.id}
                            onPress={() => handlePress(category)}
                            style={({ pressed }) => [
                                styles.pill,
                                {
                                    backgroundColor: isActive
                                        ? colors.primary
                                        : colors.surface,
                                    borderColor: isActive
                                        ? colors.primary
                                        : colors.border,
                                },
                                pressed && { opacity: 0.8 },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: isActive
                                            ? colors.primaryForeground
                                            : colors.text,
                                    },
                                ]}
                            >
                                {category.name}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.lg,
    },

    scrollContent: {
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },

    pill: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
    },

    label: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 14,
    },
});