import { useTheme } from "@/constants/theme";
import { useWishlistStore } from "@/src/store/wishlist-store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

interface WishlistHeartProps {
    courseId: string;
    title: string;
    price: number;
    thumbnailUrl: string;
    instructor: string;
    size: number;
}

export function WishlistHeart({
    courseId,
    title,
    price,
    thumbnailUrl,
    instructor,
    size = 24
}: WishlistHeartProps) {
    const { colors } = useTheme();
    const { isInWishlist, toggleItem } = useWishlistStore();

    const isSaved = isInWishlist(courseId);

    const handlePress = async () => {
        await toggleItem({
            courseId,
            title,
            price,
            thumbnailUrl,
            instructor,
            addedAt: new Date().toISOString()
        })
    }

    return (
        <Pressable
            onPress={handlePress}
            hitSlop={12}
            style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
            })}
        >
            <View
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: isSaved ? colors.error : 'rgba(255,255,255,0.95)',
                    borderWidth: 1.5,
                    borderColor: isSaved ? colors.error : 'rgba(0,0,0,0.15)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // subtle shadow so it pops on dark images
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                <Ionicons
                    name={isSaved ? 'heart' : 'heart-outline'}
                    size={size}
                    color={isSaved ? '#FFFFFF' : '#1C2321'}
                />
            </View>
        </Pressable>
    );
}
