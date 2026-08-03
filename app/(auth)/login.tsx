// app/(auth)/login.tsx

import { useAuthStore } from '@/src/store/auth-store';
import { usePendingActionStore } from '@/src/store/pending-action-store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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

            // If the user got here via a gated action (e.g. tapped Wishlist as
            // a guest), this fires that action now that they're authenticated.
            // If they navigated to login directly (e.g. from the Profile stub),
            // pendingAction is null and this is a no-op.
            await runPendingAction();

            // router.back() returns them to whatever screen triggered the
            // gated action (or wherever they were before tapping Login).
            // If there's no back history (e.g. deep-linked straight to login),
            // fall back to Home.
            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace('/(tabs)');
            }
        } catch (err) {
            setError('Invalid email or password.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {error && <Text style={styles.error}>{error}</Text>}

            <Pressable
                style={styles.primaryButton}
                onPress={handleLogin}
                disabled={isSubmitting}
            >
                <Text style={styles.primaryButtonText}>
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.push('/(auth)/signup')}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 24 },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
        fontSize: 15,
    },
    error: { color: '#dc2626', marginBottom: 12, fontSize: 13 },
    primaryButton: {
        backgroundColor: '#1a1a1a',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    primaryButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
    link: { textAlign: 'center', marginTop: 16, color: '#6b7280' },
});
