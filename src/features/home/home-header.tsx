// src/features/home/home-header.tsx
// first thing to show in home section 
// is this 

import { Fonts, spacing, useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import { useCartStore } from "@/src/store/cart-store";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { Pressable, StyleSheet, Text, View } from "react-native";

export function HomeHeader() {
    const router = useRouter();
    const { colors } = useTheme();

    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const user = useAuthStore((s) => s.user);
    const cartCount = useCartStore((s) => s.items.length);

    const greeting = isAuthenticated
        ? `Hi ${user?.name?.split(' ')[0] ?? 'there'}`
        : 'StudyLab';

    return (
        <View style={styles.row}>
            <Text style={[styles.greeting, { color: colors.text }]}> {greeting} </Text>
            <Pressable
                onPress={() => router.push('/cart')}
                style={styles.cartButton}
                hitSlop={8}
            >

                <Ionicons name="cart-outline" size={24} color={colors.text} />
                {cartCount > 0 && (
                    <View style={[styles.badge, { backgroundColor: colors.straberry }]}>
                        <Text style={styles.badgeText}>
                            {cartCount > 9 ? '9+' : cartCount}
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: spacing.md,
        fontFamily: Fonts.bodySemiBold
    },
    greeting: {
        fontFamily: Fonts.display,
        fontSize: 20,
    },
    cartButton: {
        position: 'relative',
        padding: spacing.xs,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontFamily: Fonts.bodySemiBold,
    },
})
