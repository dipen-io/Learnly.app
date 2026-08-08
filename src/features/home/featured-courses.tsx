//src/features/home/featured-courses.tsx

import {
    BrandColors, Fonts, radii, spacing, useTheme
} from "@/constants/theme";

import { Shimmer } from "@/src/components/shimmer";
import type { Course } from "@/src/types/course";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFeaturedCourses } from "./use-home-sections";
import { useCartStore } from "@/src/store/cart-store";
import { CartItem } from "@/src/types/cart";
import Toast from "@/constants/Toast";

const CARD_WIDTH = 260;
const IMAGE_HEIGHT = 150;

function StarsRating({ rating, count }: { rating: number; count: number }) {
    const { colors } = useTheme();
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    return (
        <View style={styles.ratingRow}>
            <Text style={[styles.stars, { color: BrandColors.marigold }]}>
                {'★'.repeat(fullStars)}
                {hasHalf ? '½' : ''}
            </Text>
            <Text style={[styles.ratingText, { color: colors.textMuted }]}>
                {rating} ({count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count})
            </Text>
        </View>
    );
}

function PriceTag({ price, originalPrice }: { price: number; originalPrice?: number }) {
    const { colors } = useTheme();

    if (price === 0) {
        return (
            <Text style={[styles.price, { color: colors.primary }]}>
                Free
            </Text>
        );
    }

    return (
        <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.text }]}>
                ${price.toFixed(2)}
            </Text>
            {originalPrice && (
                <Text style={[styles.originalPrice, { color: colors.textMuted }]}>
                    ${originalPrice.toFixed(2)}
                </Text>
            )}
        </View>
    );
}

function CourseCard({ course }: { course: Course }) {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const {addItem} = useCartStore();

    const handleAddToCart = async() => {
        const cartItem: CartItem = {
            courseId: course.id,
            title: course.title,
            thumbnailUrl: course.thumbnailUrl,
            price: course.price,
            quantity: 1,
        };
        try {
           await addItem(cartItem);
           Toast.show('add to cart', 'success', 640);
        } catch (error) {
           console.error('failed to add to cart');
        }
    }

    return (
        <Pressable
            onPress={() => router.push(`/course/${course.id}`)}
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: colors.surfaceElevated,
                    borderColor: colors.border,
                    shadowColor: isDark ? 'transparent' : colors.text,
                },
                pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
            ]}
        >
            {/* Thumbnail */}
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

                {/* Tag badge */}
                {course.tag && (
                    <View style={[styles.badge, { backgroundColor: BrandColors.marigold }]}>
                        <Text style={styles.badgeText}>{course.tag}</Text>
                    </View>
                )}

            <Pressable
                onPress={handleAddToCart}
                style={({ pressed }) => [
                    styles.badge2,
                    {
                        backgroundColor: BrandColors.forest,
                        opacity: pressed ? 0.7 : 1,
                        transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
                    },
                ]}
            >
                <Text style={[styles.badgeText2]}>add to cart</Text>
            </Pressable>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.category, { color: colors.primary }]}>
                    {course.category}
                </Text>

                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                    {course.title}
                </Text>

                <Text style={[styles.instructor, { color: colors.textMuted }]}>
                    {course.instructorName}
                </Text>

                <StarsRating rating={course.rating} count={course.reviewCount} />
                <PriceTag price={course.price} originalPrice={course.originalPrice} />
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
                <Shimmer width={80} height={12} borderRadius={radii.sm} />
                <View style={{ marginTop: spacing.sm }}>
                    <Shimmer width={CARD_WIDTH - 48} height={18} borderRadius={radii.sm} />
                </View>
                <View style={{ marginTop: spacing.xs }}>
                    <Shimmer width={140} height={14} borderRadius={radii.sm} />
                </View>
                <View style={{ marginTop: spacing.sm }}>
                    <Shimmer width={100} height={12} borderRadius={radii.sm} />
                </View>
                <View style={{ marginTop: spacing.sm }}>
                    <Shimmer width={60} height={18} borderRadius={radii.sm} />
                </View>
            </View>
        </View>
    );
}
export function FeaturedCourses() {
    const { colors } = useTheme();
    const { data: courses, isLoading, isError } = useFeaturedCourses();

    if (isError || (!isLoading && (!courses || courses.length === 0))) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Featured Courses
                </Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
            >
                {isLoading
                    ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
                    : courses?.map((course) => <CourseCard key={course.id} course={course} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.md,
    },

    header: {
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
        marginTop: spacing.sm
    },

    sectionTitle: {
        fontFamily: Fonts.display,
        fontSize: 22,
        lineHeight: 30,
    },

    scrollContent: {
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },

    card: {
        width: CARD_WIDTH,
        borderRadius: radii.lg,
        borderWidth: 1,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
            },
            android: { elevation: 2 },
        }),
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

    badge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: radii.sm,
    },

    badge2: {
        position: 'absolute',
        top: spacing.xs,
        right: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: 14,
        borderRadius: radii.md,
    },

    badgeText: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 10,
        color: '#FFFFFF',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    badgeText2: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 10,
        color: '#FFFFFF',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },

    content: {
        padding: spacing.md,
    },

    category: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 11,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: spacing.xs,
    },

    title: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: spacing.xs,
    },

    instructor: {
        fontFamily: Fonts.body,
        fontSize: 13,
        marginBottom: spacing.sm,
    },

    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },

    stars: {
        fontSize: 12,
        letterSpacing: 1,
    },

    ratingText: {
        fontFamily: Fonts.body,
        fontSize: 12,
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    price: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 16,
    },

    originalPrice: {
        fontFamily: Fonts.body,
        fontSize: 13,
        textDecorationLine: 'line-through',
    },
});
