// app/(auth)/login.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { NotebookField } from '@/src/components/notebook-field';
import { PasswordField } from '@/src/components/password-field';
import { RuledPaperBackground } from '@/src/components/ruled-paper-background';
import { useAuthStore } from '@/src/store/auth-store';
import { usePendingActionStore } from '@/src/store/pending-action-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const login = useAuthStore((s) => s.login);
    const runPendingAction = usePendingActionStore((s) => s.runPendingAction);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        setError(null);

        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password.');
            return;
        }

        setIsSubmitting(true);

        try {
            await login(email.trim(), password);
            await runPendingAction();

            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace('/(tabs)');
            }
        } catch {
            setError("That email or password doesn't match our records.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <RuledPaperBackground>
            <KeyboardAvoidingView
                style={[styles.flex, { backgroundColor: colors.background }]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={{ backgroundColor: colors.background }}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={[styles.eyebrow, { color: colors.primary }]}>
                                StudyLab
                            </Text>

                            <Text style={[styles.headline, { color: colors.text }]}>
                                Welcome back
                            </Text>

                            <Text style={[styles.subheadline, { color: colors.textMuted }]}>
                                Sign in to pick up where you left off
                            </Text>
                        </View>

                        {/* Form */}
                        <View
                            style={[
                                styles.formCard,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border,
                                },
                            ]}
                        >
                            <NotebookField
                                label="Email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <View style={styles.fieldDivider}>
                                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                            </View>

                            <PasswordField
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                            />

                            {/* Error */}
                            {error && (
                                <View style={styles.errorRow}>
                                    <View
                                        style={[
                                            styles.errorDot,
                                            { backgroundColor: colors.error },
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.error,
                                            { color: colors.error },
                                        ]}
                                    >
                                        {error}
                                    </Text>
                                </View>
                            )}

                            {/* Sign In Button */}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    { backgroundColor: colors.button },
                                    pressed && {
                                        opacity: 0.85,
                                        transform: [{ scale: 0.98 }],
                                    },
                                    isSubmitting && styles.primaryButtonDisabled,
                                ]}
                                onPress={handleLogin}
                                disabled={isSubmitting}
                            >
                                <Text
                                    style={[
                                        styles.primaryButtonText,
                                        { color: colors.buttonText },
                                    ]}
                                >
                                    {isSubmitting ? 'Signing in…' : 'Sign In'}
                                </Text>
                            </Pressable>

                            {/* login with OTP */}
                            <Pressable
                                onPress={() =>
                                    router.push('/(auth)/login-with-otp')
                                }
                                style={styles.forgotWrap}
                            >
                                <Text
                                    style={[styles.link, { color: colors.primary }]}>
                                    Login With OTP
                                </Text>
                            </Pressable>

                            {/* Forgot Password */}
                            <Pressable
                                onPress={() =>
                                    router.push('/(auth)/forgot-password')
                                }
                                style={styles.forgotWrap}
                            >
                                <Text
                                    style={[
                                        styles.link,
                                        { color: colors.primary },
                                    ]}
                                >
                                    Forgot your password?
                                </Text>
                            </Pressable>
                        </View>

                        {/* Footer */}
                        <View
                            style={[
                                styles.footer,
                                { borderTopColor: colors.border },
                            ]}
                        >
                            <Pressable
                                onPress={() =>
                                    router.push('/(auth)/signup')
                                }
                            >
                                <Text
                                    style={[
                                        styles.footerText,
                                        { color: colors.textMuted },
                                    ]}
                                >
                                    New here?{' '}
                                    <Text
                                        style={[
                                            styles.footerLink,
                                            { color: colors.text },
                                        ]}
                                    >
                                        Create an account
                                    </Text>
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </RuledPaperBackground>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xxl,
    },

    content: {
        width: '100%',
        maxWidth: 360,
        alignSelf: 'center',
    },

    header: {
        marginBottom: spacing.xxl,
    },

    eyebrow: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 11,
        letterSpacing: 2.5,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
    },

    headline: {
        fontFamily: Fonts.display,
        fontSize: 32,
        lineHeight: 40,
    },

    subheadline: {
        fontFamily: Fonts.body,
        fontSize: 15,
        marginTop: spacing.xs,
        lineHeight: 22,
    },

    form: {
        marginBottom: spacing.xl,
    },

    fieldGap: {
        marginTop: spacing.lg,
    },

    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },

    errorDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: spacing.sm,
    },

    error: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 13,
    },

    primaryButton: {
        paddingVertical: spacing.md + 4,
        borderRadius: radii.md,
        alignItems: 'center',
        marginTop: spacing.lg,
    },

    primaryButtonDisabled: {
        opacity: 0.5,
    },

    primaryButtonText: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 16,
        letterSpacing: 0.5,
    },

    forgotWrap: {
        alignItems: 'center',
        marginTop: spacing.lg,
    },

    link: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 14,
    },

    footer: {
        alignItems: 'center',
        marginTop: spacing.xl,
        paddingTop: spacing.xl,
        borderTopWidth: 1,
    },

    footerText: {
        fontFamily: Fonts.body,
        fontSize: 14,
    },

    footerLink: {
        fontFamily: Fonts.bodySemiBold,
    },
    formCard: {
        borderRadius: radii.lg,
        borderWidth: 1,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.xl,
    },

    fieldDivider: {
        paddingVertical: spacing.xs,
    },

    dividerLine: {
        height: 1,
        marginLeft: -spacing.lg,
        marginRight: -spacing.lg,
    },
});
