// app/cart/index.tsx

import { spacing, useTheme } from "@/constants/theme";
import { CartItemCard } from "@/src/components/cart/cart-item-card";
import { CartSummary } from "@/src/components/cart/cart-summary";
import { ThemedText } from "@/src/components/themed-text";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { useCartStore } from "@/src/store/cart-store";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function CardScreen() {
    const router = useRouter();
    const { colors, spacing } = useTheme();
    const { items, removeItem, increaseCartQty, decreaseCartQty } = useCartStore();
    const insets = useSafeAreaInsets();

    const total = items.reduce((sum, item) => sum + item.price, 0);

    function fuckVoid () {}

    // 1. Stable header button to prevent icon glitches on back gesture/press
    const renderHeaderLeft = useCallback(() => (
        <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.backArrow,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
                opacity: pressed ? 0.7 : 1,
            }]}
        >
            <Ionicons
                name="arrow-back"
                size={20}
                color={colors.text}
            />
        </Pressable>
    ), [router, colors]);

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            {/* 2. Single Stack.Screen configuration defined once */}
            <Stack.Screen
            options={{
                title: "Cart",
                headerLeft: renderHeaderLeft,
                headerTitleAlign: 'center'
            }}
            />

            {items.length === 0 ? (
                <View style={styles.center}>
                    <IconSymbol name="cart" size={64} color={colors.textMuted} />
                    <ThemedText
                        type="defaultSemiBold"
                        style={{ marginTop: spacing.md, fontSize: 18 }}
                    >
                        Your cart is empty
                    </ThemedText>
                    <ThemedText
                        style={{
                            color: colors.textMuted,
                            marginTop: spacing.sm,
                            textAlign: 'center',
                            paddingHorizontal: spacing.xl,
                        }}
                    >
                        Browse our courses and add something you'd like to learn.
                    </ThemedText>
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.courseId}
                        // Remove style={styles.card} from FlatList and place it in contentContainerStyle
                        contentContainerStyle={[
                            styles.card,
                            { paddingBottom: spacing.md, backgroundColor: colors.surface}
                        ]}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CartItemCard
                                item={item}
                                    onIncrease={increaseCartQty}
                                    onDecrease={decreaseCartQty}
                                    onBuyNow={fuckVoid}
                                onRemove={removeItem}
                                
                                onPress={() => router.push(`/course/${item.courseId}`)}
                            />
                        )}
                    />

                    <View style={{ paddingBottom: insets.bottom }}>
                        <CartSummary
                            total={total}
                            itemCount={items.length}
                            onCheckout={() => router.push('/checkout')}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: spacing.lg,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        gap: spacing.md,
    }
});
