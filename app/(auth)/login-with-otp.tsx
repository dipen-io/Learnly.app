// app/(auth)/login-with-otp.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { NotebookField } from '@/src/components/notebook-field';
import { RuledPaperBackground } from '@/src/components/ruled-paper-background';
import { useAuthStore } from '@/src/store/auth-store';
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

export default function LoginWithOtpScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const requestOtp = useAuthStore(
        (s) => s.requestEmailOtp
    );

    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSendCode = async () => {
        setError(null);

        if (!email.trim()) {
            setError('Please enter your email.');
            return;
        }

        setIsSubmitting(true);

        try {
            await requestOtp(email.trim());

            router.push({
                pathname: '/(auth)/otp',
                params: { email: email.trim(), purpose: 'login-with-otp' },
            });
        } catch {
            setError('Unable to send verification code.');
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
                        <View style={styles.header}>
                            <Text style={[styles.eyebrow, { color: colors.primary }]}>
                                StudyLab
                            </Text>

                            <Text style={[styles.headline, { color: colors.text }]}>
                                Login with OTP
                            </Text>

                            <Text style={[styles.subheadline, { color: colors.textMuted }]}>
                                Enter the email associated with your account and we'll send you
                                a verification code.
                            </Text>
                        </View>

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
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                            />

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
                                            styles.errorText,
                                            { color: colors.error },
                                        ]}
                                    >
                                        {error}
                                    </Text>
                                </View>
                            )}

                            <Pressable
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    { backgroundColor: colors.button },
                                    pressed && { opacity: 0.85 },
                                    isSubmitting && styles.disabled,
                                ]}
                                onPress={handleSendCode}
                                disabled={isSubmitting}
                            >
                                <Text
                                    style={[
                                        styles.primaryButtonText,
                                        { color: colors.buttonText },
                                    ]}
                                >
                                    {isSubmitting
                                        ? 'Sending...'
                                        : 'Get OTP'}
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.footer}>
                            <Pressable onPress={() => router.back()}>
                                <Text
                                    style={[
                                        styles.footerText,
                                        { color: colors.primary },
                                    ]}
                                >
                                    ← Back to Login
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
        lineHeight: 22,
        marginTop: spacing.xs,
    },

    formCard: {
        borderRadius: radii.lg,
        borderWidth: 1,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.xl,
    },

    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
    },

    errorDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: spacing.sm,
    },

    errorText: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 13,
    },

    primaryButton: {
        alignItems: 'center',
        borderRadius: radii.md,
        marginTop: spacing.xl,
        paddingVertical: spacing.md + 4,
    },

    primaryButtonText: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 16,
        letterSpacing: 0.5,
    },

    disabled: {
        opacity: 0.5,
    },

    footer: {
        alignItems: 'center',
    },

    footerText: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 14,
    },
});