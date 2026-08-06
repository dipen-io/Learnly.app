//src/features/home/continue-learning.tsx

import { Fonts, radii, spacing, useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContuneLearning } from "./use-home-sections";


export function ContinueLearning() {
    const router = useRouter();
    const { colors } = useTheme();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const { data: courses, isLoading } = useContuneLearning();

    if (!isAuthenticated || isLoading || !courses || courses.length === 0) {
        return null;
    }

    return (
        <view>
            <View style={styles.header}>
                <Text style={[styles.title, {
                    color: colors.text

                }]}>Continue Learning</Text>

                <Pressable onPress={() => router.push('/(tabs)/my-learning')}>
                    <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
                </Pressable>
            </View>
            {/* Horizontal strip */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
            >
                {courses.map((course) => {
                    const percent = Math.round(
                        (course.completedLessons / course.totalLessons) * 100
                    );

                    return (
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
                            onPress={() =>
                                router.push(`/course/${course.courseId}`)
                            }
                        >
                            <Image
                                source={{ uri: course.thumbnailUrl }}
                                style={styles.thumbnail}
                                resizeMode="cover"
                            />

                            <View style={styles.meta}>
                                <Text
                                    style={[styles.courseTitle, { color: colors.text }]}
                                    numberOfLines={1}
                                >
                                    {course.title}
                                </Text>

                                {/* Progress bar */}
                                <View style={styles.progressRow}>
                                    <View
                                        style={[
                                            styles.track,
                                            { backgroundColor: colors.border },
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.fill,
                                                {
                                                    width: `${percent}%`,
                                                    backgroundColor: colors.primary,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.percentLabel,
                                            { color: colors.textMuted },
                                        ]}
                                    >
                                        {percent}%
                                    </Text>
                                </View>

                                <Text
                                    style={[
                                        styles.lessonCount,
                                        { color: colors.textMuted },
                                    ]}
                                >
                                    {course.completedLessons} / {course.totalLessons} lessons
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </view>
    )
}

const CARD_WIDTH = 220;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.lg,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
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
        marginBottom: spacing.sm,
    },

    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xs,
    },

    track: {
        flex: 1,
        height: 4,
        borderRadius: radii.full,
        overflow: 'hidden',
    },

    fill: {
        height: '100%',
        borderRadius: radii.full,
    },

    percentLabel: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 12,
        minWidth: 32,
        textAlign: 'right',
    },

    lessonCount: {
        fontFamily: Fonts.body,
        fontSize: 12,
    },
});