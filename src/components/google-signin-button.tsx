// src/components/google-signin-button.tsx
//
// NOT wired into signup.tsx yet — needs YOUR Google OAuth client IDs
// first (see setup steps below), which I can't generate for you.
//
// Setup required before this works:
// 1. Go to console.cloud.google.com -> create a project -> APIs & Services
//    -> Credentials -> Create OAuth Client ID.
// 2. Create THREE client IDs: iOS, Android, Web. Each needs your app's
//    bundle identifier / package name (iOS/Android) or is used directly
//    (Web - this one also acts as the "expo go" / dev client ID).
// 3. Add all three as EXPO_PUBLIC_ vars in your .env:
//      EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=...
//      EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=...
//      EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...
// 4. npx expo install expo-auth-session expo-crypto
// 5. Add "scheme" to app.json if not already present (needed for the
//    redirect back into your app after Google's login screen).
//
// Apple requirement: if you ship this on iOS, App Store rule 4.8 means
// you must ALSO offer "Sign in with Apple" as an equivalent option.
// That's a separate library (expo-apple-authentication) - flag if you
// want that built out too.

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import { useAuthStore } from '@/src/store/auth-store';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export function GoogleSignInButton() {
    const { colors } = useTheme();
    const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const idToken = response.authentication?.idToken;
            if (idToken) {
                loginWithGoogle(idToken);
            }
        }
    }, [response]);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { borderColor: colors.border },
                pressed && { backgroundColor: colors.surface },
            ]}
            disabled={!request}
            onPress={() => promptAsync()}
        >
            <Ionicons name="logo-google" size={18} color={colors.text} />
            <Text style={[styles.text, { color: colors.text }]}>
                Continue with Google
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.md,
        borderRadius: radii.md,
        borderWidth: 1,
        marginBottom: spacing.sm,
    },
    text: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 15,
    },
});
