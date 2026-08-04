// app/(auth)/otp.tsx

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { RuledPaperBackground } from '@/src/components/ruled-paper-background';
import { useAuthStore } from '@/src/store/auth-store';
import { usePendingActionStore } from '@/src/store/pending-action-store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

export default function OtpScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    const { email } = useLocalSearchParams<{ email: string }>();

    const verifyEmailOtp = useAuthStore((s) => s.verifyEmailOtp);
    const requestEmailOtp = useAuthStore((s) => s.requestEmailOtp);
    const runPendingAction = usePendingActionStore((s) => s.runPendingAction);

    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    useEffect(() => {
        if (code.length === CODE_LENGTH) {
            handleVerify();
        }
    }, [code]);

    const handleVerify = async () => {
        if (!email || code.length !== CODE_LENGTH) return;

        setError(null);
        setIsVerifying(true);
        try {
            await verifyEmailOtp(email, code);
            await runPendingAction();

            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace('/(tabs)');
            }
        } catch {
            setError('That code is incorrect or expired.');
            setCode('');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (!email || cooldown > 0) return;
        setError(null);
        try {
            await requestEmailOtp(email);
            setCooldown(RESEND_COOLDOWN_SECONDS);
        } catch {
            setError('Could not resend the code. Try again.');
        }
    };

    return (
        <RuledPaperBackground>
            <View style={styles.content}>
                <Text style={[styles.eyebrow, { color: colors.primary }]}>
                    StudyLab
                </Text>
                <Text style={[styles.headline, { color: colors.text }]}>
                    Check your email
                </Text>
                <Text style={[styles.subheadline, { color: colors.textMuted }]}>
                    We sent a 6-digit code to{'\n'}
                    <Text style={{ color: colors.text, fontFamily: Fonts.bodySemiBold }}>
                        {email}
                    </Text>
                </Text>

                <Pressable onPress={() => inputRef.current?.focus()}>
                    <View style={styles.codeRow}>
                        {Array.from({ length: CODE_LENGTH }).map((_, i) => {
                            const digit = code[i] ?? '';
                            const isActiveCursor = i === code.length;
                            return (
                                <View
                                    key={i}
                                    style={[
                                        styles.codeBox,
                                        { borderColor: colors.border },
                                        isActiveCursor && { borderColor: colors.primary },
                                    ]}
                                >
                                    <Text style={[styles.codeDigit, { color: colors.text }]}>
                                        {digit}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </Pressable>

                <TextInput
                    ref={inputRef}
                    value={code}
                    onChangeText={(text) =>
                        setCode(text.replace(/[^0-9]/g, '').slice(0, CODE_LENGTH))
                    }
                    keyboardType="number-pad"
                    maxLength={CODE_LENGTH}
                    autoFocus
                    style={styles.hiddenInput}
                />

                {error && (
                    <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
                )}

                {isVerifying && (
                    <Text style={[styles.verifying, { color: colors.textMuted }]}>
                        Verifying…
                    </Text>
                )}

                <Pressable
                    onPress={handleResend}
                    disabled={cooldown > 0}
                    style={styles.resendWrap}
                >
                    <Text
                        style={[
                            styles.resendText,
                            { color: cooldown > 0 ? colors.textMuted : colors.primary },
                        ]}
                    >
                        {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
                    </Text>
                </Pressable>
            </View>
        </RuledPaperBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
    },
    eyebrow: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 11,
        letterSpacing: 2.5,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
    },
    headline: { fontFamily: Fonts.display, fontSize: 30, lineHeight: 38 },
    subheadline: {
        fontFamily: Fonts.body,
        fontSize: 15,
        marginTop: spacing.sm,
        marginBottom: spacing.xl,
        lineHeight: 22,
    },
    codeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    codeBox: {
        width: 44,
        height: 54,
        borderRadius: radii.md,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeDigit: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 22,
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0,
    },
    error: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 13,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    verifying: {
        fontFamily: Fonts.body,
        fontSize: 13,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    resendWrap: {
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    resendText: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 14,
    },
});
