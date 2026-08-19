import { useTheme } from "@/constants/theme";
import { ThemedText } from "@/src/components/themed-text";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";


interface LoginOrSignupProps {
    onClose: () => void;
}

export function LoginOrSignup({ onClose }: LoginOrSignupProps) {
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
                        borderWidth: 1.5,
                        borderColor: colors.border,
                        borderRadius: radii.md,
                        opacity: pressed ? 0.7 : 1,
                        paddingVertical: 12
                    },
                ]}
                onPress={() => router.push('/(auth)/signup')}
            >
                <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
                    Sign Up
                </ThemedText>
            </Pressable>

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        borderWidth: 1.5,
                        borderColor: colors.border,
                        borderRadius: radii.md,
                        opacity: pressed ? 0.7 : 1,
                        marginTop: spacing.md,
                        paddingVertical: 10
                    },
                ]}
                onPress={onClose}
            >
                <Ionicons
                    name="close"
                    size={24}
                    color={colors.straberry}
                />
            </Pressable>
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

})