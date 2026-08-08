// app/_layout.tsx

import { OnboardingProvider, useOnboarding } from '@/src/context/onboarding-context';
import { useResolvedTheme } from '@/src/hooks/use-resolved-theme';
import { QueryProvider } from '@/src/providers/query-provider';
import { useAuthStore } from '@/src/store/auth-store';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import 'react-native-reanimated';

// remove warning 
LogBox.ignoreLogs([
  'Looks like you have configured linking in multiple places',
]);

export const unstable_settings = {
  anchor: '(tabs)',
};

// Module scope — must run before any component mounts
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { navigationTheme, isDark } = useResolvedTheme();
  const { hasSeenOnboarding, isLoading: isOnboardingLoading } = useOnboarding();
  const router = useRouter();
  const segments = useSegments();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthHydrated = useAuthStore((s) => s.isHydrated);
  const hydrateAuth = useAuthStore((s) => s.hydrate);

  // Single source of truth for "do we know everything we need to decide
  // which screen to show?" — both onboarding state and auth state must
  // have resolved before we make any redirect decision.
  const isAppReady = isAuthHydrated && !isOnboardingLoading;

  // Kick off auth hydration once, on mount
  useEffect(() => {
    hydrateAuth();
  }, []);

  // Hide splash screen exactly once, exactly when both pieces of async
  // state have resolved — not before, not from two different places.
  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  // Single redirect effect. Priority: onboarding first, then auth.
  // A first-time user should see onboarding regardless of auth state;
  // an already-onboarded, already-logged-in user should never see (auth).
  useEffect(() => {
    if (!isAppReady) return;

    const inOnboarding = segments[0] === 'onboarding';
    const inAuthGroup = segments[0] === '(auth)';

    if (!hasSeenOnboarding && !inOnboarding) {
      router.replace('/onboarding');
      return;
    }

    if (hasSeenOnboarding && inOnboarding) {
      router.replace('/(tabs)');
      return;
    }

    // Guests may browse (tabs) freely — only redirect AWAY from (auth)
    // if already logged in. We don't force guests out of (tabs).
    if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAppReady, hasSeenOnboarding, isAuthenticated, segments]);

  // Native splash screen is still covering the app at this point —
  // returning null here is fine, nothing flashes on screen.
  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <NavThemeProvider value={navigationTheme}>
        <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: navigationTheme.colors.card,
            },
            headerTintColor: navigationTheme.colors.text,
            headerShadowVisible: false,
        }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="course/[id]" options={{ headerShown: true, title: '' }} />
          <Stack.Screen name="player/[lessonId]" options={{ headerShown: true, title: '' }} />
          <Stack.Screen name="cart" options={{ headerShown: true, title: 'Cart', headerShadowVisible: false }} />
          {/* <Stack.Screen
            name="cart/index"
            options={{
              headerShown: true,
              title: 'Cart',
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              animation: 'slide_from_right', // Ensures smooth native slide
            }}
          /> */}
          <Stack.Screen name="checkout/index" options={{ headerShown: true, title: 'Checkout' }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </NavThemeProvider>

      {/* StatusBar now follows YOUR theme, not the system */}
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <OnboardingProvider>
        <RootLayoutNav />
      </OnboardingProvider>
    </QueryProvider>
  );
}
