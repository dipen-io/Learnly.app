// app/cart/index.tsx

import { spacing, useTheme } from "@/constants/theme";
import Toast from "@/constants/Toast";
import { CartItemCard } from "@/src/components/cart/cart-item-card";
import { CartSummary } from "@/src/components/cart/cart-summary";
import { ThemedText } from "@/src/components/themed-text";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { useCartStore } from "@/src/store/cart-store";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
    TouchableOpacity,
    FlatList,
    Pressable,
    Alert,
    StyleSheet,
    View,
    Text,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function CartScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    const { items, removeItem, clearCart, increaseCartQty, decreaseCartQty } = useCartStore();
    const insets = useSafeAreaInsets();

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const handleClearCart = () => {
        if (items.length === 0) return;

        Alert.alert(
            "Clear Cart?",
            `Remove all ${items.length} item${items.length > 1 ? "s" : ""} from your cart.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Clear",
                    style: "destructive",
                    onPress: () => {
                        clearCart();
                        Toast.show("Cart cleared", "info", 640);
                    },
                },
            ]
        );
    };

    function fuckVoid() {}

    const renderHeaderLeft = useCallback(
        () => (
            <Pressable
                onPress={() => router.back()}
                hitSlop={8}
                style={({ pressed }) => [
                    {
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: colors.backArrow,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 8,
                        opacity: pressed ? 0.7 : 1,
                    },
                ]}
            >
                <Ionicons name="arrow-back" size={20} color={colors.text} />
            </Pressable>
        ),
        [router, colors]
    );

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <Stack.Screen
                options={{
                    // title: `Cart (${items.length})`,
                    title: `Cart`,
                    headerLeft: renderHeaderLeft,
                    headerTitleAlign: "center",
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
                            textAlign: "center",
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
                        contentContainerStyle={[
                            styles.card,
                            { paddingBottom: spacing.md, backgroundColor: colors.surface },
                        ]}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{ marginTop: 4 }}>
                                {/* Divider line */}
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: colors.border || colors.textMuted + '20',
                                        marginVertical: 12,
                                        marginHorizontal: 4,
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={handleClearCart}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.clearButtonWrap,
                                        { backgroundColor: colors.error + '15' || '#FEF2F2' }, // subtle red tint bg
                                    ]}
                                >
                                    <Text style={[styles.clearText, { color: colors.error || '#EF4444' }]}>
                                    Clear all ({items.length})
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
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
                            onCheckout={() => router.push("/checkout")}
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
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        borderRadius: spacing.lg,
        marginHorizontal: spacing.md,
        padding: spacing.md,
        gap: spacing.md,
    },
    clearButtonWrap: {
        width: "50%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
 borderRadius: 20,  
    },
    clearText: {
        fontSize: 14,
        fontWeight: "600",
    },
});
