import { useTheme } from "@/constants/theme";
import { useWishlistStore } from "@/src/store/wishlist-store";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Pressable } from "react-native";
import { ThemedText } from "../themed-text";

interface RemoveFromWishlistButtonProps {
    courseId: string;
    variant?: 'icon' | 'text' | 'icon-text';
    onRemoved?: () => void;
}

export function RemoveFromWishlistButton({ courseId, variant = 'icon', onRemoved }: RemoveFromWishlistButtonProps) {
    const { colors, radii, spacing, fontSizes } = useTheme();

    const { removeItem } = useWishlistStore();

    const handleRemove = async () => {
        await removeItem(courseId);
        // Alert.alert(
        //     'Remove from Wishlist',
        //     'Are u sure u want to remove this course?',
        //     [
        //         { text: 'Cancel', style: 'cancel' },
        //         {
        //             text: 'Remove',
        //             style: 'destructive',
        //             onPress: async () => {
        //                 await removeItem(courseId);
        //                 onRemoved?.();
        //             }
        //         }
        //     ]
        // )
    }

    if (variant === 'icon') {
        return (
            <Pressable
                onPress={handleRemove}
                hitSlop={12}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    // backgroundColor: 'rgba(255,255,255,0.95)',
                    backgroundColor: colors.backArrow,
                    borderWidth: 1.5,
                    borderColor: 'rgba(0,0,0,0.15)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                })}
            >
                <Ionicons name="trash-outline" size={18} color={colors.error} />
            </Pressable>
        );
    }

    if (variant === 'text') {
        return (
            <Pressable
                onPress={handleRemove}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    backgroundColor: colors.error + '12',
                    borderRadius: radii.md,
                })}
            >
                <ThemedText
                    style={{
                        fontSize: fontSizes.sm,
                        color: colors.error,
                        fontWeight: '600',
                    }}
                >
                    Remove
                </ThemedText>
            </Pressable>
        );
    }


    return (
        <Pressable
            onPress={handleRemove}
            style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                backgroundColor: colors.error + '12',
                borderRadius: radii.md,
            })}
        >
            <ThemedText
                style={{
                    fontSize: fontSizes.sm,
                    color: colors.error,
                    fontWeight: '600',
                }}
            >
                Remove
            </ThemedText>
        </Pressable>
    );

}