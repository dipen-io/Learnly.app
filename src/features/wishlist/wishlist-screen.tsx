//src/features/wishlist/wishlist-scree.tsx

import { ThemedText } from "@/src/components/themed-text";
import React from "react";
import { View } from "react-native";

export function WishListScreen() {
    return (
        <View style={{ padding: 16 }}>
            <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>
                This is from wishlistscreen
            </ThemedText>
        </View>
    );
}