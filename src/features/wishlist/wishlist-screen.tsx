//src/features/wishlist/wishlist-scree.tsx

import { useTheme } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { RemoveFromWishlistButton } from '@/src/components/wishlist/remove-from-wishlist-button';
import { useWishlistStore } from '@/src/store/wishlist-store';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WishlistScreen() {
    const router = useRouter();
    const { colors, spacing, radii, shadows, fontSizes } = useTheme();
    const { items, removeItem, clearWishlist } = useWishlistStore();


    const handleClearAll = () => {
        Alert.alert(
            'Clear Wishlist',
            `Remove all ${items.length} saved courses?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: () => clearWishlist(),
                },
            ]
        );
    };

    if (items.length === 0) {
        return (
            <ThemedView style={[styles.container, styles.center]}>
                <Stack.Screen options={{ title: 'Wishlist' }} />
                <IconSymbol name="heart" size={64} color={colors.textMuted} />
                <ThemedText
                    type="defaultSemiBold"
                    style={{ marginTop: spacing.md, fontSize: fontSizes.xl }}
                >
                    Your wishlist is empty
                </ThemedText>
                <ThemedText
                    style={{
                        color: colors.textMuted,
                        marginTop: spacing.sm,
                        textAlign: 'center',
                        paddingHorizontal: spacing.xl,
                        fontSize: fontSizes.md,
                    }}
                >
                    Save courses you're interested in and come back to them later.
                </ThemedText>

                <Pressable
                    onPress={() => router.push('/(tabs)/explore')}
                    style={({ pressed }) => ({
                        marginTop: spacing.xl,
                        opacity: pressed ? 0.85 : 1,
                    })}
                >
                    <View
                        style={{
                            backgroundColor: colors.button,
                            borderRadius: radii.lg,
                            paddingVertical: spacing.md,
                            paddingHorizontal: spacing.xl,
                        }}
                    >
                        <ThemedText
                            type="defaultSemiBold"
                            style={{ color: colors.buttonText, fontSize: fontSizes.lg }}
                        >
                            Browse Courses
                        </ThemedText>
                    </View>
                </Pressable>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: `Wishlist` }} />
            <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.courseId}
                    contentContainerStyle={{ padding: spacing.md }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push(`/course/${item.courseId}`)}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.9 : 1,
                                marginBottom: spacing.md,
                                position: 'relative'
                            })}
                        >
                            <ThemedView
                                style={{
                                    borderRadius: radii.lg,
                                    borderWidth: StyleSheet.hairlineWidth,
                                    borderColor: colors.border,
                                    backgroundColor: colors.surface,
                                    ...shadows.sm,
                                    overflow: 'hidden',
                                }}
                            >
                                <View style={{ position: 'relative' }}>
                                    <Image
                                        source={{ uri: item.thumbnailUrl }}
                                        style={{
                                            width: '100%',
                                            height: 160,
                                            backgroundColor: colors.surface,
                                        }}
                                        contentFit="cover"
                                        transition={200}
                                    />
                                    <View style={styles.wishlist}>


                                        <RemoveFromWishlistButton
                                            courseId={item.courseId}
                                            variant='icon' // 'text' or 'icon-text'
                                        />
                                    </View>
                                </View>


                                <View style={{ padding: spacing.md }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <ThemedText
                                            type="defaultSemiBold"
                                            numberOfLines={2}
                                            style={{
                                                flex: 1,
                                                fontSize: fontSizes.lg,
                                                lineHeight: 22,
                                                marginRight: spacing.sm,
                                            }}
                                        >
                                            {item.title}
                                        </ThemedText>

                                        <Pressable
                                            onPress={() => removeItem(item.courseId)}
                                            hitSlop={12}
                                            style={({ pressed }) => ({
                                                opacity: pressed ? 0.5 : 1,
                                                padding: 4,
                                            })}
                                        >
                                            <IconSymbol
                                                name="heart.fill"
                                                size={20}
                                                color={colors.error}
                                            />
                                        </Pressable>
                                    </View>

                                    {item.instructor && (
                                        <ThemedText
                                            style={{
                                                fontSize: fontSizes.sm,
                                                color: colors.textMuted,
                                                marginTop: 4,
                                            }}
                                        >
                                            {item.instructor}
                                        </ThemedText>
                                    )}

                                    <ThemedText
                                        type="defaultSemiBold"
                                        style={{
                                            fontSize: fontSizes.lg,
                                            color: colors.primary,
                                            marginTop: spacing.sm,
                                        }}
                                    >
                                        ${item.price.toFixed(2)}
                                    </ThemedText>
                                </View>
                            </ThemedView>

                        </Pressable>
                    )}

                />
                <Pressable
                    onPress={handleClearAll}
                    style={({ pressed }) => ({
                        marginHorizontal: spacing.md,
                        marginTop: spacing.sm,
                        marginBottom: spacing.md,
                        opacity: pressed ? 0.7 : 1,
                    })}
                >
                    <View
                        style={{
                            backgroundColor: colors.straberry,
                            borderRadius: radii.lg,
                            paddingVertical: spacing.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ThemedText
                            type="defaultSemiBold"
                            style={{
                                fontSize: fontSizes.md,
                                color: colors.buttonText,
                            }}
                        >
                            {` Clear All (${items.length})`}
                        </ThemedText>
                    </View>
                </Pressable>

            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wishlist: {
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 10
    }
});