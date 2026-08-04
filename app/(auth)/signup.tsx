// app/(auth)/signup.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { NotebookField } from '@/src/components/notebook-field';
import { PasswordField } from '@/src/components/password-field';
import { RuledPaperBackground } from '@/src/components/ruled-paper-background';
import { useAuthStore } from '@/src/store/auth-store';
import { Ionicons } from '@expo/vector-icons';
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

export default function SignupScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const signup = useAuthStore((s) => s.signup);
    const requestEmailOtp = useAuthStore((s) => s.requestEmailOtp);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    const validateEmail = () => {
        if (!email.trim()) {
            setError('Enter your email first.');
            return false;
        }
        return true;
    };

    const handlePasswordSignup = async () => {
        setError(null);
        if (!email.trim() || !password.trim()) {
            setError('Please fill in both fields.');
            return;
        }
        setIsSubmitting(true);
        try {
            await signup(email.trim(), password);
            router.replace('/(tabs)');
        } catch {
            setError('Something went wrong creating your account.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailOtpSignup = async () => {
        setError(null);
        if (!validateEmail()) return;

        setIsSendingOtp(true);
        try {
            await requestEmailOtp(email.trim());
            router.push({
                pathname: '/(auth)/otp',
                params: { email: email.trim() },
            });
        } catch {
            setError('Could not send a code. Try again.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleGoogleSignup = () => {
        // See src/components/google-signin-button.tsx for the real
        // implementation — wired in separately since it needs your Google
        // OAuth client IDs configured first.
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
                                Create your account
                            </Text>
                            <Text style={[styles.subheadline, { color: colors.textMuted }]}>
                                Takes less than a minute
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.formCard,
                                { backgroundColor: colors.surface, borderColor: colors.border },
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

                            <PasswordField
                                label="Password"
                                placeholder="At least 8 characters"
                                value={password}
                                onChangeText={setPassword}
                            />

                            {error && (
                                <View style={styles.errorRow}>
                                    <View
                                        style={[styles.errorDot, { backgroundColor: colors.error }]}
                                    />
                                    <Text style={[styles.error, { color: colors.error }]}>
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
                                onPress={handlePasswordSignup}
                                disabled={isSubmitting}
                            >
                                <Text
                                    style={[styles.primaryButtonText, { color: colors.buttonText }]}
                                >
                                    {isSubmitting ? 'Creating account…' : 'Create Account'}
                                </Text>
                            </Pressable>
                        </View>

                        {/* Alternative paths */}
                        <Pressable
                            style={({ pressed }) => [
                                styles.altButton,
                                { borderColor: colors.border },
                                pressed && { backgroundColor: colors.surface },
                                isSendingOtp && styles.disabled,
                            ]}
                            onPress={handleEmailOtpSignup}
                            disabled={isSendingOtp}
                        >
                            <Ionicons name="mail-outline" size={18} color={colors.text} />
                            <Text style={[styles.altButtonText, { color: colors.text }]}>
                                {isSendingOtp ? 'Sending code…' : 'Continue with Email'}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.altButton,
                                { borderColor: colors.border },
                                pressed && { backgroundColor: colors.surface },
                            ]}
                            onPress={handleGoogleSignup}
                        >
                            <Ionicons name="logo-google" size={18} color={colors.text} />
                            <Text style={[styles.altButtonText, { color: colors.text }]}>
                                Continue with Google
                            </Text>
                        </Pressable>

                        <View style={[styles.footer, { borderTopColor: colors.border }]}>
                            <Pressable onPress={() => router.push('/(auth)/login')}>
                                <Text style={[styles.footerText, { color: colors.textMuted }]}>
                                    Already have an account?{' '}
                                    <Text style={[styles.footerLink, { color: colors.text }]}>
                                        Log in
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
    flex: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xxl,
    },
    content: { width: '100%', maxWidth: 360, alignSelf: 'center' },
    header: { marginBottom: spacing.xl },
    eyebrow: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 11,
        letterSpacing: 2.5,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
    },
    headline: { fontFamily: Fonts.display, fontSize: 32, lineHeight: 40 },
    subheadline: {
        fontFamily: Fonts.body,
        fontSize: 15,
        marginTop: spacing.xs,
        lineHeight: 22,
    },
    formCard: {
        borderRadius: radii.lg,
        borderWidth: 1,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    // fieldDivider: { paddingVertical: spacing.xs },
    // dividerLine: { height: 1, marginLeft: -spacing.lg, marginRight: -spacing.lg },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
    errorDot: { width: 6, height: 6, borderRadius: 3, marginRight: spacing.sm },
    error: { fontFamily: Fonts.bodyMedium, fontSize: 13 },
    primaryButton: {
        paddingVertical: spacing.md + 4,
        borderRadius: radii.md,
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    primaryButtonText: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 16,
        letterSpacing: 0.5,
    },
    disabled: { opacity: 0.5 },
    orRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.lg,
    },
    orLine: { flex: 1, height: 1 },
    orText: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 11,
        letterSpacing: 1,
        marginHorizontal: spacing.md,
    },
    altButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.md,
        borderRadius: radii.md,
        borderWidth: 1,
        marginBottom: spacing.sm,
    },
    altButtonText: { fontFamily: Fonts.bodyMedium, fontSize: 15 },
    footer: {
        alignItems: 'center',
        marginTop: spacing.lg,
        paddingTop: spacing.lg,
        // borderTopWidth: 1,
    },
    footerText: { fontFamily: Fonts.body, fontSize: 14 },
    footerLink: { fontFamily: Fonts.bodySemiBold },
});
