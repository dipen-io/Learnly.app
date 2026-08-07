import { useTheme } from "@/constants/theme";
import { CartItemCard } from "@/src/components/cart/cart-item-card";
import { CartSummary } from "@/src/components/cart/cart-summary";
import { ThemedText } from "@/src/components/themed-text";
import { ThemedView } from "@/src/components/themed-view";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { useCartStore } from "@/src/store/cart-store";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

export default function CardScreen() {
    const router = useRouter();
    const { colors, spacing, radii, } = useTheme();
    const { items, removeItem } = useCartStore();

    const total = items.reduce((sum, item) => sum + item.price, 0);
    if (items.length === 0) {
        return (
            <ThemedView style={[styles.container, styles.center]}>
                <Stack.Screen options={{ title: 'Cart' }} />
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
            </ThemedView>
        );
    }
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'Cart' }} />

            <FlatList
                data={items}
                keyExtractor={(item) => item.courseId}
                contentContainerStyle={{ padding: spacing.md, paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <CartItemCard
                        item={item}
                        onRemove={removeItem}
                        onPress={() => router.push(`/course/${item.courseId}`)}
                    />
                )}
            />

            <CartSummary
                total={total}
                itemCount={items.length}
                onCheckout={() => router.push('/checkout')}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
