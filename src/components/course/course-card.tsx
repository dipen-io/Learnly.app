import { useTheme } from '@/constants/theme';
import Toast from '@/constants/Toast';
import { ThemedText } from '@/src/components/themed-text';
import { WishlistHeart } from '@/src/components/wishlist/wishlist-heart';
import { useCartStore } from '@/src/store/cart-store';
import type { Course } from '@/src/types/course';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { StarsRating } from './stars-rating';

type CardSize = 'sm' | 'md' | 'lg';

interface CourseCardProps {
    course: Course;
    size?: CardSize;
    showWishlist?: boolean;
    showCart?: boolean;
}

const SIZE_CONFIG: Record<CardSize, { width: number; imageHeight: number }> = {
    sm: { width: 160, imageHeight: 90 },
    md: { width: 220, imageHeight: 120 },
    lg: { width: 280, imageHeight: 160 },
};

export function CourseCard({
    course,
    size = 'md',
    showWishlist = true,
    showCart = true,
}: CourseCardProps) {
    const router = useRouter();
    const { colors, spacing, radii, shadows, fontSizes } = useTheme();
    const { addItem, items } = useCartStore();
    const [imageLoaded, setImageLoaded] = useState(false);

    const config = SIZE_CONFIG[size];
    const isInCart = items.some((item) => item.courseId === course.id);

    const handleAddToCart = async () => {
        if (isInCart) {
            router.push('/cart');
            return;
        }

        try {
            await addItem({
                courseId: course.id,
                title: course.title,
                thumbnailUrl: course.thumbnailUrl,
                price: course.price,
                addedAt: new Date().toISOString(),
                quantity: 0
            });
            Toast.show('Added to cart', 'success', 640);
        } catch (error) {
            console.error('Failed to add to cart');
        }
    };

    const handlePress = () => {
        router.push(`/course/${course.id}`);
    };

    const hasDiscount = course.originalPrice && course.originalPrice > course.price;

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => ({
                opacity: pressed ? 0.92 : 1,
                width: config.width,
            })}
        >
            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: colors.surface,
                        borderRadius: radii.lg,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: colors.border,
                        ...shadows.sm,
                        overflow: 'hidden',
                    },
                ]}
            >
                {/* Image */}
                <View style={{ position: 'relative' }}>
                    {!imageLoaded && (
                        <View
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    backgroundColor: colors.surface,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 1,
                                },
                            ]}
                        >
                            <Ionicons name="image-outline" size={24} color={colors.border} />
                        </View>
                    )}

                    <Image
                        source={{ uri: course.thumbnailUrl }}
                        style={{
                            width: '100%',
                            height: config.imageHeight,
                            backgroundColor: colors.surface,
                        }}
                        contentFit="cover"
                        onLoadEnd={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                    />

                    {/* Wishlist Heart */}
                    {showWishlist && (
                        <View style={styles.heartContainer}>
                            <WishlistHeart
                                courseId={course.id}
                                title={course.title}
                                price={course.price}
                                thumbnailUrl={course.thumbnailUrl}
                                instructor={course.instructorName}
                                size={20}
                            />
                        </View>
                    )}

                    {/* Cart Badge */}
                    {showCart && (
                        <Pressable
                            onPress={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                            style={[
                                styles.cartBadge,
                                {
                                    backgroundColor: isInCart ? colors.success : colors.button,
                                },
                            ]}
                        >
                            <ThemedText
                                style={{
                                    fontSize: fontSizes.xs,
                                    color: isInCart ? '#FFFFFF' : colors.buttonText,
                                    fontWeight: '700',
                                }}
                            >
                                {isInCart ? 'In Cart ✓' : 'Add'}
                            </ThemedText>
                        </Pressable>
                    )}
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

                    {/* Rating */}
                    <View style={{ marginTop: 4 }}>
                        <StarsRating
                            rating={course.rating ?? 0}
                            count={course.reviewCount}
                            size={11}
                        />
                    </View>

                    {/* Price Row */}
                    <View style={[styles.priceRow, { marginTop: 6 }]}>
                        <ThemedText
                            type="defaultSemiBold"
                            style={{ fontSize: fontSizes.md, color: colors.primary }}
                        >
                            ${course.price.toFixed(2)}
                        </ThemedText>

                        {hasDiscount && (
                            <ThemedText
                                style={{
                                    fontSize: fontSizes.xs,
                                    color: colors.textMuted,
                                    textDecorationLine: 'line-through',
                                    marginLeft: spacing.sm,
                                }}
                            >
                                ${course.originalPrice!.toFixed(2)}
                            </ThemedText>
                        )}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
    },
    heartContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
    },
    cartBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        zIndex: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});