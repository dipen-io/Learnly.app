// src/features/explore/category-grid.tsx
//
// Note: reuses useCategories() from the Home feature, since categories
// are genuinely shared reference data, not owned by either screen. A
// cross-feature import like this is fine for small, stable shared data —
// if it grows more complex later, worth moving to a neutral location
// like src/hooks/use-categories.ts instead.

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { useCategories } from '@/src/features/home/use-home-sections';
import type { Category } from '@/src/types/category';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Local icon mapping — keeps icon choice a purely visual/frontend
// concern, no need for the backend to store icon names. Extend as you
// add real categories. Falls back to a generic icon for anything unmapped.
const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
    development: 'code-slash-outline',
    design: 'color-palette-outline',
    business: 'briefcase-outline',
    marketing: 'megaphone-outline',
    photography: 'camera-outline',
    music: 'musical-notes-outline',
    writing: 'pencil-outline',
    'personal-development': 'trending-up-outline',
};
const DEFAULT_ICON: keyof typeof Ionicons.glyphMap = 'apps-outline';

type CategoryGridProps = {
    onSelectCategory: (category: Category) => void;
};

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
    const { colors, fontSizes } = useTheme();
    const { data: categories, isLoading, isError } = useCategories();

    if (isError) return null;

    if (isLoading) {
        return (
            <View style={styles.grid}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <View key={i} style={styles.cell}>
                        <View
                            style={[styles.iconCircleSkeleton, { backgroundColor: colors.surface }]}
                        />
                        <View
                            style={[styles.labelSkeleton, { backgroundColor: colors.surface }]}
                        />
                    </View>
                ))}
            </View>
        );
    }

    return (
        <View style={styles.grid}>
            {categories?.map((category) => (
                <Pressable
                    key={category.id}
                    style={({ pressed }) => [
                        styles.cell,
                        pressed && { opacity: 0.7 },
                    ]}
                    onPress={() => onSelectCategory(category)}
                >
                    <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}>
                        <Ionicons
                            name={CATEGORY_ICONS[category.slug] ?? DEFAULT_ICON}
                            size={24}
                            color={colors.primary}
                        />
                    </View>
                    <Text
                        style={[styles.label, { color: colors.text }]}
                        numberOfLines={1}
                    >
                        {category.name}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    cell: {
        width: '30%', // 3 columns; switch to '47%' for 2 columns if preferred
        alignItems: 'center',
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: radii.xl ?? 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
    },
    iconCircleSkeleton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        marginBottom: spacing.xs,
    },
    label: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 12,
        textAlign: 'center',
    },
    labelSkeleton: {
        width: '80%',
        height: 10,
        borderRadius: 3,
    },
});
