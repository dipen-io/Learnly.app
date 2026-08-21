// app/_layout.tsx

import Toast from '@/constants/Toast';
import OfflineBanner from '@/src/components/offline-banner';
import LeftArrowIcon from '@/src/components/renderLeftArrow';
import { OnboardingProvider, useOnboarding } from '@/src/context/onboarding-context';
import { useResolvedTheme } from '@/src/hooks/use-resolved-theme';
import { QueryProvider } from '@/src/providers/query-provider';
import { useAuthStore } from '@/src/store/auth-store';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, LogBox, View } from 'react-native';
import 'react-native-reanimated';

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
  const navigationState = useRootNavigationState();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthHydrated = useAuthStore((s) => s.isHydrated);
  const hydrateAuth = useAuthStore((s) => s.hydrate);

  // Single source of truth for "do we know everything we need to decide
  // which screen to show?"
  const isAppReady = isAuthHydrated && !isOnboardingLoading;

  // Kick off auth hydration once, on mount
  useEffect(() => {
    hydrateAuth();
  }, []);

  // Hide splash screen exactly once, exactly when we're ready.
  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  // Single redirect effect. Priority: onboarding first, then auth.
  // Guarded on navigationState?.key so we never call router.replace
  // before the navigator has actually mounted.
  useEffect(() => {
    if (!isAppReady) return;
    if (!navigationState?.key) return;

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
  }, [isAppReady, hasSeenOnboarding, isAuthenticated, segments, navigationState?.key]);

  // Native splash screen is still covering the app at this point —
  // returning null-ish here is fine, nothing flashes on screen.
  if (!isAppReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: navigationTheme.colors.background,
        }}
      >
        <Image
          source={require('@/assets/images/lgo.png')}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
      </View>
    );
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
          <Stack.Screen name="cart/index" options={{ headerShown: true, title: 'Cart', headerShadowVisible: false }} />

          <Stack.Screen
            name="course/index"
            options={{
              title: 'Course',
              headerTitleAlign: 'center',
              headerLeft: () => <LeftArrowIcon />,
            }}
          />

          <Stack.Screen
            name="settings/index"
            options={{
              title: 'Settings',
              headerTitleAlign: 'center',
              headerLeft: () => <LeftArrowIcon />,
            }}
          />
          <Stack.Screen
            name="wishlist/index"
            options={{
              title: 'Wishlist',
              headerTitleAlign: 'center',
              headerLeft: () => <LeftArrowIcon />,
            }}
          />
          <Stack.Screen name="checkout/index" options={{ headerShown: true, title: 'Checkout' }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </NavThemeProvider>
      <OfflineBanner />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <OnboardingProvider>
        <RootLayoutNav />
        <Toast />
      </OnboardingProvider>
    </QueryProvider>
  );
}