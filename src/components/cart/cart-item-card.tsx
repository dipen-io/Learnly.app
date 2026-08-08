import { useTheme } from "@/constants/theme";
import { CartItem } from "@/src/types/cart";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface CartItemCardProps {
    item: CartItem;
    onRemove: (courseId: string) => void;
    onBuyNow: (courseId: string) => void;
    onIncrease: (courseId: string) => void;
    onDecrease: (courseId: string) => void;
    onPress: () => void;
}

export function CartItemCard({onIncrease, item, onRemove, onBuyNow, onPress, onDecrease }: CartItemCardProps) {
    const { colors, spacing, radii, shadows } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={
                ({ pressed }) => ({
                    opacity: pressed ? 0.9 : 1,
                    marginButtom: spacing.md
                })}>
            <ThemedView
                style={[
                    styles.card,
                    {
                        backgroundColor: colors.back,
                        borderColor: colors.border,
                    },
                ]}
            >
                <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={[
                        styles.thumbnail,
                        {
                            borderRadius: radii.md,
                            backgroundColor: colors.background,
                        },
                    ]}
                    contentFit="cover"
                    transition={200}
                />

                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <ThemedText
                            type="defaultSemiBold"
                            numberOfLines={2}
                            style={styles.title}
                        >
                            {item.title}
                        </ThemedText>

                        <Pressable
                            onPress={() => onRemove(item.courseId)}
                            hitSlop={10}
                            style={({ pressed }) => [
                                styles.deleteButton,
                                pressed && { opacity: 0.5 },
                            ]}
                        >
                            <Ionicons
                                name="trash-outline"
                                size={18}
                                color={colors.textMuted ?? colors.text}
                            />
                        </Pressable>
                    </View>

                    <ThemedText
                        type="defaultSemiBold"
                        style={[styles.price, { color: colors.primary }]}
                    >
                        {item.price.toFixed(2)} Rs
                    </ThemedText>

                    <View style={styles.bottomRow}>
                        <View
                            style={[
                                styles.quantityContainer,
                                {
                                    borderColor: colors.border,
                                    backgroundColor: colors.background,
                                },
                            ]}
                        >
                            <Pressable
                                onPress={() => onDecrease(item.courseId)}
                                hitSlop={8}
                                style={({ pressed }) => [
                                    styles.qtyButton,
                                    pressed && { opacity: 0.5 },
                                ]}
                            >
                                <Ionicons
                                    name="remove"
                                    size={15}
                                    color={colors.text}
                                />
                            </Pressable>

                            <ThemedText
                                type="defaultSemiBold"
                                style={styles.qtyText}
                            >
                                {item.quantity ?? 1}
                            </ThemedText>

                            <Pressable
                                onPress={() => onIncrease(item.courseId)}
                                hitSlop={8}
                                style={({ pressed }) => [
                                    styles.qtyButton,
                                    pressed && { opacity: 0.5 },
                                ]}
                            >
                                <Ionicons
                                    name="add"
                                    size={15}
                                    color={colors.text}
                                />
                            </Pressable>
                        </View>

                        <Pressable
                            onPress={() => onBuyNow(item.courseId)}
                            style={({ pressed }) => [
                                styles.buyNowButton,
                                {
                                    backgroundColor: colors.primary,
                                    opacity: pressed ? 0.75 : 1,
                                },
                            ]}
                        >
                            <ThemedText style={styles.buyNowText}>
                                Buy now
                            </ThemedText>
                        </Pressable>
                    </View>
                </View>
            </ThemedView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        // padding: 1,
        // marginBottom: 12,
        // borderRadius: 16,s
        // borderWidth: StyleSheet.hairlineWidth,
        minHeight: 124,
    },

    thumbnail: {
        width: 98,
        height: 114,
    },

    content: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "space-evenly",
        minWidth: 0,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    title: {
        flex: 1,
        fontSize: 15,
        lineHeight: 20,
    },

    deleteButton: {
        padding: 3,
    },

    price: {
        fontSize: 16,
    },

    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 32,
        paddingHorizontal: 10,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
    },

    qtyButton: {
        width: 26,
        height: 26,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
    },

    qtyText: {
        minWidth: 24,
        textAlign: "center",
        fontSize: 14,
    },

    buyNowButton: {
        height: 32,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
    },

    buyNowText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});
