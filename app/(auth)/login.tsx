// app/(auth)/login.tsx

import { Colors, Fonts, radii, spacing } from '@/constants/theme';
import { NotebookField } from '@/src/components/notebook-field';
import { RuledPaperBackground } from '@/src/components/ruled-paper-background';
import { useAuthStore } from '@/src/store/auth-store';
import { usePendingActionStore } from '@/src/store/pending-action-store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const login = useAuthStore((s) => s.login);
    const runPendingAction = usePendingActionStore((s) => s.runPendingAction);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        setError(null);
        setIsSubmitting(true);
        try {
            await login(email, password);
            await runPendingAction();

            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace('/(tabs)');
            }
        } catch {
            setError('That email or password doesn\'t match our records.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <RuledPaperBackground>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.eyebrow}>StudyLab</Text>
                        <Text style={styles.headline}>Welcome back.</Text>
                        <View style={styles.headlineSwash} />
                    </View>

                    <View style={styles.form}>
                        <NotebookField
                            label="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="you@example.com"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <NotebookField
                            label="Password"
                            secureTextEntry
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                        />

                        {error && <Text style={styles.error}>{error}</Text>}

                        <Pressable
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && styles.primaryButtonPressed,
                            ]}
                            onPress={handleLogin}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.primaryButtonText}>
                                {isSubmitting ? 'Signing in…' : 'Log In'}
                            </Text>
                        </Pressable>

                        <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
                            <Text style={styles.link}>Forgot your password?</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        style={styles.footer}
                        onPress={() => router.push('/(auth)/signup')}
                    >
                        <Text style={styles.footerText}>
                            New here? <Text style={styles.footerLink}>Create an account</Text>
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </RuledPaperBackground>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingLeft: spacing.xl + 16, // clears the red margin line
        justifyContent: 'center',
    },
    header: {
        marginBottom: spacing.xxl,
    },
    eyebrow: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 12,
        letterSpacing: 1.5,
        color: Colors.forest,
        marginBottom: spacing.sm,
    },
    headline: {
        fontFamily: Fonts.display,
        fontSize: 34,
        color: Colors.ink,
    },
    headlineSwash: {
        width: 56,
        height: 3,
        backgroundColor: Colors.marigold,
        borderRadius: 2,
        marginTop: spacing.sm,
    },
    form: {
        marginBottom: spacing.xl,
    },
    error: {
        fontFamily: Fonts.body,
        color: Colors.clay,
        fontSize: 13,
        marginTop: -spacing.sm,
        marginBottom: spacing.md,
    },
    primaryButton: {
        backgroundColor: Colors.ink,
        paddingVertical: spacing.md + 2,
        borderRadius: radii.md,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    primaryButtonPressed: {
        backgroundColor: Colors.forest,
    },
    primaryButtonText: {
        fontFamily: Fonts.bodySemiBold,
        color: Colors.paper,
        fontSize: 16,
    },
    link: {
        fontFamily: Fonts.bodyMedium,
        color: Colors.forest,
        fontSize: 14,
        textAlign: 'center',
        marginTop: spacing.lg,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: spacing.xl,
    },
    footerText: {
        fontFamily: Fonts.body,
        color: Colors.inkMuted,
        fontSize: 14,
    },
    footerLink: {
        fontFamily: Fonts.bodySemiBold,
        color: Colors.ink,
    },
});
