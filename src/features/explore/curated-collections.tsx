// src/features/explore/curated-collections.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { Collection } from '@/src/types/explore';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface CuratedCollectionsProps {
    collections: Collection[];
}

export function CuratedCollections({ collections }: CuratedCollectionsProps) {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.title, { color: colors.text }]}>Curated for You</Text>

            {collections.map((collection) => (
                <View key={collection.id} style={styles.section}>
                    <View style={styles.header}>
                        <View>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                {collection.title}
                            </Text>
                            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                                {collection.subtitle}
                            </Text>
                        </View>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        decelerationRate="fast"
                    >
                        {collection.courses.map((course) => (
                            <Pressable
                                key={course.id}
                                style={({ pressed }) => [
                                    styles.card,
                                    {
                                        backgroundColor: colors.surface,
                                        borderColor: colors.border,
                                    },
                                    pressed && { opacity: 0.8 },
                                ]}
                                onPress={() => router.push(`/course/${course.id}`)}
                            >
                                <Image
                                    source={{ uri: course.thumbnailUrl }}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                />
                                <View style={styles.meta}>
                                    <Text
                                        style={[styles.courseTitle, { color: colors.text }]}
                                        numberOfLines={2}
                                    >
                                        {course.title}
                                    </Text>
                                    <Text
                                        style={[styles.instructor, { color: colors.textMuted }]}
                                    >
                                        {course.instructorName}
                                    </Text>
                                    <Text style={[styles.price, { color: colors.text }]}>
                                        {course.price === 0
                                            ? 'Free'
                                            : `$${course.price.toFixed(2)}`}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            ))}
        </View>
    );
}

const CARD_WIDTH = 200;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.xl,
        marginTop: spacing.xl
    },

    title: {
        fontFamily: Fonts.display,
        fontSize: 20,
        lineHeight: 28,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },

    section: {
        marginBottom: spacing.lg,
    },

    header: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.sm,
    },

    sectionTitle: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 16,
        lineHeight: 22,
    },

    subtitle: {
        fontFamily: Fonts.body,
        fontSize: 13,
        marginTop: 2,
    },

    scrollContent: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },

    card: {
        width: CARD_WIDTH,
        borderRadius: radii.md,
        borderWidth: 1,
        overflow: 'hidden',
    },

    thumbnail: {
        width: '100%',
        height: 110,
    },

    meta: {
        padding: spacing.md,
    },

    courseTitle: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: spacing.xs,
    },

    instructor: {
        fontFamily: Fonts.body,
        fontSize: 12,
        marginBottom: spacing.sm,
    },

    price: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 14,
    },
});