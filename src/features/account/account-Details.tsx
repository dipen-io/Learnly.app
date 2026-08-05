// src/features/account/account-Details.tsx

import { useTheme } from "@/constants/theme";
import { ThemedText } from "@/src/components/themed-text";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { useAuthStore } from "@/src/store/auth-store";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AccountHeader } from "./account-header";
import { AccountMenu } from "./account-menu";
import { GuestAccountHeader } from "./guest-account-header";
import { useUsers } from "./use-account-section";


function GuestView() {
    const router = useRouter();
    const { colors, spacing, radii } = useTheme();

    return (
        <View
            style={[
                styles.guestContainer,
                { backgroundColor: colors.background, padding: spacing.xl },
            ]}
        >
            <View style={styles.guestIcon}>
                <IconSymbol name="person.circle" size={64} color={colors.textMuted} />
            </View>

            <ThemedText type="title" style={{ textAlign: 'center', marginBottom: spacing.sm }}>
                You're browsing as a guest
            </ThemedText>

            <ThemedText
                style={[
                    styles.guestSubtitle,
                    { color: colors.textMuted, marginBottom: spacing.xl },
                ]}
            >
                Log in to track your courses, save progress, and access your purchases
                from any device.
            </ThemedText>

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: colors.button,
                        borderRadius: radii.md,
                        marginBottom: spacing.md,
                        opacity: pressed ? 0.85 : 1,
                    },
                ]}
                onPress={() => router.push('/(auth)/login')}
            >
                <ThemedText
                    type="defaultSemiBold"
                    style={{ color: colors.buttonText, fontSize: 15 }}
                >
                    Log In
                </ThemedText>
            </Pressable>

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: colors.border,
                        borderRadius: radii.md,
                        opacity: pressed ? 0.7 : 1,
                    },
                ]}
                onPress={() => router.push('/(auth)/signup')}
            >
                <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
                    Sign Up
                </ThemedText>
            </Pressable>
        </View>
    );
}


// main section
export function AccountDetails() {
    const { data: users, isError, isLoading } = useUsers();
    const { colors, radii, spacing, fontSizes } = useTheme();
    const logout = useAuthStore((s) => s.logout);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isError) return null;
    if (!isLoading && (!users)) return null;


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header */}

            {
                isAuthenticated ? (
                    <>
                        <AccountHeader
                            name={users.name}
                            email={users.email}
                            avatar={users.avatar}

                        />

                        {/* Stats */}


                    </>
                ) : (
                    <GuestAccountHeader />
                )
            }

            {/* Menu */}
            <AccountMenu isAuthenticated={isAuthenticated} />
        </View>
    );
}

const styles = StyleSheet.create({
    guestContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestIcon: {
        marginBottom: 16,
    },
    guestSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    avatarRing: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
    },
    menuCard: {
        // card wrapper
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});


