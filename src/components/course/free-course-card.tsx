// src/compnents/course/free-course-card.tsx

import { useTheme } from "@/constants/theme";
import type { Course } from "@/src/types/course";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

interface FreeCoursesProp {
    course: Course;
}

export function FreeCourseCard({ course }: FreeCoursesProp) {
    const router = useRouter();
    const { colors, fontSizes, radii, shadows, spacing } = useTheme();

    return (
        <Pressable
            onPress={() => router.push(`/course/${course.id}`)}
            style={({ pressed }) => ({
                opacity: pressed ? 0.9 : 1,
            })}
        >
            <View
                style={[styles.card, {
                    backgroundColor: colors.surface,
                    borderRadius: spacing.lg,
                    borderWidth: 2,
                    borderColor: colors.success + '40',
                    ...shadows.sm,
                }]}
            >
                <View style={styles.imageWrap}>
                    <Image
                        source={{ uri: course.thumbnailUrl }}
                        style={[styles.thumbnail, { backgroundColor: colors.surface }]}
                        contentFit="cover"
                        transition={200}
                    />
                    {/* FREE Pill Badge */}
                    <View
                        style={[
                            styles.freeBadge,
                            {
                                backgroundColor: colors.success,
                            },
                        ]}
                    >
                        <ThemedText
                            style={{
                                fontSize: fontSizes.xs,
                                color: '#FFFFFF',
                                fontWeight: '800',
                                letterSpacing: 0.5,
                            }}
                        >
                            FREE
                        </ThemedText>
                    </View>
                </View>
                {/* Content */}
                <View style={{ padding: spacing.sm }}>
                    <ThemedText
                        type="defaultSemiBold"
                        numberOfLines={2}
                        style={{ fontSize: fontSizes.sm, lineHeight: 18 }}
                    >
                        {course.title}
                    </ThemedText>

                    <ThemedText
                        style={{
                            fontSize: fontSizes.xs,
                            color: colors.textMuted,
                            marginTop: 2,
                        }}
                        numberOfLines={1}
                    >
                        {course.instructorName}
                    </ThemedText>

                    {/* Start Free Button */}
                    <View
                        style={[
                            styles.ctaButton,
                            {
                                backgroundColor: colors.success + '12',
                                borderRadius: radii.md,
                                marginTop: spacing.sm,
                                paddingVertical: 6,
                            },
                        ]}
                    >
                        <ThemedText
                            style={{
                                fontSize: fontSizes.xs,
                                color: colors.success,
                                fontWeight: '700',
                                textAlign: 'center',
                            }}
                        >
                            Start Free →
                        </ThemedText>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 160,
        overflow: 'hidden',
    },
    imageWrap: {
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: 90,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    freeBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
    },
    ctaButton: {
        alignItems: 'center',
    },
});