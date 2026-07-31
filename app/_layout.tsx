import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { OnboardingProvider, useOnboarding } from '@/src/context/onboarding-context';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';


export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { hasSeenOnboarding, isLoading } = useOnboarding();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;
    const inOnboarding = segments[0] === 'onboarding';

    if (!hasSeenOnboarding && !inOnboarding) {
      router.replace('/onboarding' as any);
    } else if (hasSeenOnboarding && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [isLoading, hasSeenOnboarding, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#0D6EFD" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <RootLayoutNav />
    </OnboardingProvider>
  );
}
