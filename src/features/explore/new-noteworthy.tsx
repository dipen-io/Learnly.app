// src/features/explore/new-noteworthy.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { Course } from '@/src/types/course';
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

interface NewNoteworthyProps {
    courses: Course[];
}

export function NewNoteworthy({ courses }: NewNoteworthyProps) {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>New & Noteworthy</Text>
                <Pressable>
                    <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
            >
                {courses.map((course) => (
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
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>NEW</Text>
                        </View>
                        <View style={styles.meta}>
                            <Text
                                style={[styles.courseTitle, { color: colors.text }]}
                                numberOfLines={2}
                            >
                                {course.title}
                            </Text>
                            <Text style={[styles.instructor, { color: colors.textMuted }]}>
                                {course.instructorName}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const CARD_WIDTH = 160;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.xxl,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },

    title: {
        fontFamily: Fonts.display,
        fontSize: 20,
        lineHeight: 28,
    },

    seeAll: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 14,
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
        position: 'relative',
    },

    thumbnail: {
        width: '100%',
        height: 100,
    },

    badge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: '#2F4F3E',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: radii.sm,
    },

    badgeText: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 9,
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },

    meta: {
        padding: spacing.md,
    },

    courseTitle: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 13,
        lineHeight: 18,
        marginBottom: spacing.xs,
    },

    instructor: {
        fontFamily: Fonts.body,
        fontSize: 12,
    },
});