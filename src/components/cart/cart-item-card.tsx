import { useTheme } from "@/constants/theme";
import { CartItem } from "@/src/types/cart";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View, } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface CartItemCardProps {
    item: CartItem;
    onRemove: (courseId: string) => void;
    onPress?: () => void;
}

export function CartItemCard({ item, onRemove, onPress }: CartItemCardProps) {
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
                style={[styles.card,
                {
                    borderRadius: radii.lg,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: colors.border,
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
                        numberOfLines={2} style={{ fontSize: 15, lineHeight: 20, flex: 1 }}>
                        {item.title}
                    </ThemedText>
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
        padding: 12,
        alignItems: 'flex-start',
    },
    thumbnail: {
        width: 100,
        height: 72,
    },
    content: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
        minHeight: 72,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
});