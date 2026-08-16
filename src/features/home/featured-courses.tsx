//src/features/home/featured-courses.tsx

import {
    BrandColors, Fonts, radii, spacing, useTheme
} from "@/constants/theme";

import Toast from "@/constants/Toast";
import { SectionHeader } from "@/src/components/section-header";
import { Shimmer } from "@/src/components/shimmer";
import { WishlistHeart } from "@/src/components/wishlist/wishlist-heart";
import { useCartStore } from "@/src/store/cart-store";
import { CartItem } from "@/src/types/cart";
import type { Course } from "@/src/types/course";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFeaturedCourses } from "./use-home-sections";

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
    const { colors, fontSizes } = useTheme();

    if (price === 0) {
        return (
            <Text style={[styles.price, { color: colors.primary, fontSize: fontSizes.sm }]}>
                Free
            </Text>
        );
    }

    return (
        <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.text }]}>
                Rs {price.toFixed(2)}
            </Text>
            {originalPrice && (
                <Text style={[styles.originalPrice, { color: colors.textMuted }]}>
                    Rs {originalPrice.toFixed(2)}
                </Text>
            )}
        </View>
    );
}

function CourseCard({ course }: { course: Course }) {
    const router = useRouter();
    const { colors, isDark, fontSizes } = useTheme();
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const { addItem, items } = useCartStore();
    const isInCart = items.some((item) => item.courseId === course.id);

    const handleAddToCart = async () => {
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

                <View style={styles.heartContainer}>
                    <WishlistHeart
                        courseId={course.id}
                        title={course.title}
                        price={course.price}
                        thumbnailUrl={course.thumbnailUrl}
                        instructor={course.instructorName}
                        size={22}
                    />
                </View>

                {isInCart ? (
                    // Renders AFTER adding to cart
                    <Pressable
                        onPress={() => router.push('/cart')}
                        style={({ pressed }) => [
                            styles.badge2,
                            {
                                backgroundColor: BrandColors.forest, // or a muted color like gray
                                opacity: pressed ? 0.7 : 1,
                                transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
                            },
                        ]}
                    >
                        <Text style={[styles.badgeText2]}>In Cart ✓</Text>
                    </Pressable>
                ) : (
                    // Renders BEFORE adding to cart
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
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.category, { color: colors.primary, fontSize: fontSizes.xs }]}>
                    {course.category}
                </Text>

                <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.md }]} numberOfLines={2}>
                    {course.title}
                </Text>

                <Text style={[styles.instructor, { color: colors.textMuted, fontSize: fontSizes.sm }]}>
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
    const { colors, fontSizes } = useTheme();
    const { data: courses, isLoading, isError } = useFeaturedCourses();
    const router = useRouter();

    if (isError || (!isLoading && (!courses || courses.length === 0))) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <SectionHeader
                title="Featured Courses"
                // subtitle="Based on your interests"
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
                    ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
                    : courses?.map((course) => <CourseCard key={course.id} course={course} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.sm,
    },

    header: {
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
        marginTop: spacing.sm
    },

    sectionTitle: {
        fontFamily: Fonts.display,
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
        lineHeight: 22,
        marginBottom: spacing.xs,
    },

    instructor: {
        fontFamily: Fonts.body,
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
        textDecorationLine: 'line-through',
    },

    heartContainer: {
        position: 'absolute',
        bottom: 4,
        right: 7,
        zIndex: 10

    },
});
