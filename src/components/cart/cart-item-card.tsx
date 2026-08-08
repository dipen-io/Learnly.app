import { radii, useTheme } from "@/constants/theme";
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
    onPress?: () => void;
}

export function CartItemCard({ item, onRemove, onPress }: CartItemCardProps) {
    const { colors, spacing, radii, shadows } = useTheme();
    function onIncrease(courseId: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Pressable
            onPress={onPress}
            style={
                ({ pressed }) => ({
                    opacity: pressed ? 0.9 : 1,
                    marginButtom: spacing.md
                })}>
            <ThemedView
                style={[styles.card,
                {
                    // borderRadius: radii.lg,
                    // borderWidth: StyleSheet.hairlineWidth,
                    // borderColor: colors.border,
                    backgroundColor: colors.surface
                    // ...shadows.success
                }]}
            >
                <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={[styles.thumbnail, {
                        borderRadius: radii.md, backgroundColor: colors.surface

                    }]}
                    contentFit="cover"
                    transition={200}
                />
                <View style={styles.content}>
                    <ThemedText type="defaultSemiBold"
                        numberOfLines={2} style={{ fontSize: 15, lineHeight: 20 }}>
                        {item.title}
                    </ThemedText>
                    {/* Quantity Controls on the Right: [-] count [+] */}
                    <View style={styles.quantityContainer}>
                        <Pressable
                            onPress={() => onIncrease?.(item.courseId)}
                            hitSlop={12}
                            style={({ pressed }) => [
                                styles.qtyButton,
                                { backgroundColor: colors.background },
                                pressed && { opacity: 0.5 }
                            ]}
                        >
                            <Ionicons name="remove" size={16} color={colors.text} />
                        </Pressable>

                        <ThemedText type="defaultSemiBold" style={styles.qtyText}>
                            {item.quantity ?? 1}
                        </ThemedText>

                        <Pressable
                            onPress={() => onIncrease?.(item.courseId)}
                            hitSlop={12}
                            style={({ pressed }) => [
                                styles.qtyButton,
                                { backgroundColor: colors.straberry },
                                pressed && { opacity: 0.5 }
                            ]}
                        >
                            <Ionicons name="add" size={16} color={colors.text} />
                        </Pressable>
                    </View>
                    <View style={styles.footer}>
                        <ThemedText type="defaultSemiBold" style={{ fontSize: 15, color: colors.primary }}>${item.price.toFixed(2)}</ThemedText>

                        <Pressable onPress={() => onRemove(item.courseId)}
                            hitSlop={23} style={
                                ({ pressed }) => ({
                                    opacity: pressed ? 0.5 : 1,
                                    padding: spacing.sm
                                })
                            }></Pressable>
                    </View>
                </View>
            </ThemedView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        // padding: 1,
        alignItems: 'flex-start',
    },
    thumbnail: {
        width: 100,
        height: 100,
    },
    content: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
        minHeight: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',        // Keeps - button, count, and + button vertically centered
        alignSelf: 'flex-start',     // 👈 Crucial: Prevents stretching and wraps ONLY the content
        borderRadius: radii.full,
        marginVertical: 3,
        paddingHorizontal: 5,
        paddingVertical: 1,
        gap: 8,
        borderWidth: 1,
        borderColor: '#eddfef',
    },
    qtyButton: {
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radii.full,
    },
    qtyText: {
        fontSize: 14,
        minWidth: 18,
        textAlign: 'center',
    },
});