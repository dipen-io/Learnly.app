// src/(auth)/new-password.tsx

import { Fonts, spacing, useTheme } from "@/constants/theme";
import { PasswordField } from "@/src/components/password-field";
import { useAuthStore } from "@/src/store/auth-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NewPasswordScreen() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const { colors, brand, isDark } = useTheme();
    const saveNewPassword = useAuthStore((s) => s.saveNewPassword);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');

        if (!newPassword || !confirmPassword) {
            setError('Please fill both fields!');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Password not match');
            return;
        }

        try {
            saveNewPassword(email, newPassword)
            router.replace('/(tabs)');

        } catch (error) {
            setError('Unable to save new Password!');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }
            ]}>Save New Password</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                For: {email}
            </Text>

            <PasswordField
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
            />

            <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
            />

            {!!error && <Text style={[styles.error, { color: colors.error }]}>
                {error}
            </Text>}
            <Pressable
                onPress={handleSubmit}
                style={[styles.button, { backgroundColor: brand.marigold }]}
                disabled={loading}
            >

                <Text style={styles.buttonText}>
                    {loading ? 'Saving..' : 'Save Password'}
                </Text>

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: spacing.lg,
    },
    error: {
        marginTop: spacing.sm,
        marginBottom: spacing.sm,
    },
    button: {
        marginTop: spacing.lg,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.semibold,
    },
})