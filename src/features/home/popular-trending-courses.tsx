// src/features/home/recommended-courses.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { SectionHeader } from '@/src/components/section-header';
import { Shimmer } from '@/src/components/shimmer';
import type { Course } from '@/src/types/course';
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
import { usePopularCourses } from './use-home-sections';

const CARD_WIDTH = 200;
const IMAGE_HEIGHT = 110;

function CompactCourseCard({ course }: { course: Course }) {
    const router = useRouter();
    const { colors, fontSizes } = useTheme();
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const displayPrice =
        course.price === 0
            ? 'Free'
            : `$${course.price.toFixed(2)}`;

    return (
        <Pressable
            onPress={() => router.push(`/course/${course.id}`)}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                },
                pressed && { opacity: 0.8 },
            ]}
        >
            <View style={styles.imageWrap}>
                {!imageLoaded && (
                    <View style={StyleSheet.absoluteFill}>
                        <Shimmer width={CARD_WIDTH} height={IMAGE_HEIGHT} borderRadius={0} />
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

            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.md }]} numberOfLines={2}>
                    {course.title}
                </Text>

                <Text style={[styles.instructor, { color: colors.textMuted, fontSize: fontSizes.sm }]}>
                    {course.instructorName}
                </Text>

                <View style={styles.footer}>
                    <Text style={[styles.rating, { color: colors.textMuted }]}>
                        ★ {course.rating}
                    </Text>
                    <Text style={[styles.price, { color: colors.text, fontSize: fontSizes.sm }]}>
                        {displayPrice}
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
            <Shimmer width={CARD_WIDTH} height={IMAGE_HEIGHT} borderRadius={0} />
            <View style={styles.content}>
                <Shimmer width={CARD_WIDTH - 32} height={14} borderRadius={radii.sm} />
                <View style={{ marginTop: spacing.xs }}>
                    <Shimmer width={100} height={12} borderRadius={radii.sm} />
                </View>
                <View style={{ marginTop: spacing.sm }}>
                    <Shimmer width={60} height={14} borderRadius={radii.sm} />
                </View>
            </View>
        </View>
    );
}

export function PopularTrendingCourses() {
    const { colors, fontSizes } = useTheme();
    const { data: courses, isLoading, isError, } = usePopularCourses();
    const router = useRouter();

    if (isError || (!isLoading && (!courses || courses.length === 0))) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <SectionHeader
                title="Popular Right Now"
                subtitle="Find Trenging courses"
                actionLabel="See All"
                onActionPress={() => router.push('/explore?filter=recommended')}
            />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
            >
                {isLoading
                    ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
                    : courses?.map((course: any) => (
                        <CompactCourseCard key={course.id} course={course} />
                    ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.sm,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },

    sectionTitle: {
        fontFamily: Fonts.display,
        lineHeight: 28,
    },

    seeAll: {
        fontFamily: Fonts.bodySemiBold,
    },

    scrollContent: {
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },

    card: {
        width: CARD_WIDTH,
        borderRadius: radii.md,
        borderWidth: 1,
        overflow: 'hidden',
    },

    imageWrap: {
        width: CARD_WIDTH,
        height: IMAGE_HEIGHT,
        position: 'relative',
    },

    thumbnail: {
        width: '100%',
        height: '100%',
    },

    content: {
        padding: spacing.md,
    },

    title: {
        fontFamily: Fonts.bodySemiBold,
        lineHeight: 20,
        marginBottom: spacing.xs,
    },

    instructor: {
        fontFamily: Fonts.body,
        marginBottom: spacing.sm,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    rating: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 12,
    },

    price: {
        fontFamily: Fonts.bodySemiBold,
    },
});