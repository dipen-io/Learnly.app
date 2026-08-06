//src/features/home/trending-courses.tsx

import { BrandColors, Fonts, radii, spacing, useTheme } from "@/constants/theme";
import { Shimmer } from "@/src/components/shimmer";
import type { TrendingCourse } from "@/src/data/dummy-trending";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTrendingCourses } from "./use-home-sections";

const THUMB_SIZE = 80;

function TrendingCard({ course }: { course: TrendingCourse }) {
    const router = useRouter();
    const { colors } = useTheme();

    const [imageLoaded, setImageLoaded] = React.useState(false);

    const formattedEnrolled =
        course.weeklyEnrollments >= 1000
            ? `${(course.weeklyEnrollments / 1000).toFixed(1)}k`
            : `${course.weeklyEnrollments}`;

    return (
        <Pressable
            onPress={() => router.push(`/course/${course.id}`)}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: colors.surfaceElevated,
                    borderColor: colors.border,
                },
                pressed && { transform: [{ scale: 0.985 }], opacity: 0.9 },
            ]}
        >
            {/* Big rank number */}
            <Text style={[styles.rank, { color: colors.border }]}>
                {String(course.rank).padStart(2, '0')}
            </Text>

            {/* Thumbnail */}
            <View style={styles.thumbWrap}>
                {!imageLoaded && (
                    <View style={StyleSheet.absoluteFill}>
                        <Shimmer width={THUMB_SIZE} height={THUMB_SIZE} borderRadius={radii.md} />
                    </View>
                )}
                <Image
                    source={{ uri: course.thumbnailUrl }}
                    style={[styles.thumbnail, { opacity: imageLoaded ? 1 : 0 }]}
                    resizeMode="cover"
                    onLoadEnd={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                    {course.title}
                </Text>

                <Text style={[styles.instructor, { color: colors.textMuted }]}>
                    {course.instructorName}
                </Text>

                <View style={styles.statRow}>
                    <Text style={[styles.fire, { color: BrandColors.marigold }]}>↑</Text>
                    <Text style={[styles.stat, { color: colors.textMuted }]}>
                        {formattedEnrolled} this week
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.rating, { color: colors.textMuted }]}>
                        ★ {course.rating}
                    </Text>
                    <Text style={[styles.category, { color: colors.primary }]}>
                        {course.category}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

function SkeletonCard() {
    const { colors } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Shimmer width={36} height={28} borderRadius={radii.sm} />
            <Shimmer width={THUMB_SIZE} height={THUMB_SIZE} borderRadius={radii.md} />
            <View style={styles.content}>
                <Shimmer width={180} height={16} borderRadius={radii.sm} />
                <View style={{ marginTop: spacing.xs }}>
                    <Shimmer width={100} height={12} borderRadius={radii.sm} />
                </View>
                <View style={{ marginTop: spacing.sm }}>
                    <Shimmer width={80} height={12} borderRadius={radii.sm} />
                </View>
            </View>
        </View>
    );
}


export function TrendingCourses() {
    const { colors } = useTheme();
    const { data: courses, isLoading, isError } = useTrendingCourses();

    if (isError || (!isLoading && (!courses || courses.length === 0))) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Text style={[styles.icon, { color: BrandColors.marigold }]}>↑</Text>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Trending Now
                    </Text>
                </View>
                <Pressable>
                    <Text style={[styles.seeAll, { color: colors.primary }]}>
                        See All
                    </Text>
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
            >
                {isLoading
                    ? [1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)
                    : courses?.map((course) => (
                        <TrendingCard key={course.id} course={course} />
                    ))}
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.xxl,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },

    icon: {
        fontSize: 18,
        fontFamily: Fonts.bodySemiBold,
    },

    sectionTitle: {
        fontFamily: Fonts.display,
        fontSize: 20,
        lineHeight: 28,
    },

    seeAll: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 14,
    },

    scrollContent: {
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },

    card: {
        width: 320,
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: radii.lg,
        borderWidth: 1,
        gap: spacing.md,
    },

    rank: {
        fontFamily: Fonts.display,
        fontSize: 28,
        lineHeight: 32,
        minWidth: 36,
    },

    thumbWrap: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: radii.md,
        overflow: 'hidden',
        position: 'relative',
    },

    thumbnail: {
        width: '100%',
        height: '100%',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 2,
    },

    instructor: {
        fontFamily: Fonts.body,
        fontSize: 13,
        marginBottom: spacing.sm,
    },

    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: spacing.sm,
    },

    fire: {
        fontSize: 14,
    },

    stat: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 12,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    rating: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 12,
    },

    category: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 11,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
});