import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppearanceSection } from '@/src/features/settings/appearance-section';
import { ThemedView } from '@/src/components/themed-view';
import { useResolvedTheme } from '@/src/hooks/use-resolved-theme';

export default function SettingsScreen() {
  const { isDark } = useResolvedTheme();

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? 'dark' : 'light'}]}>
      <Stack.Screen options={{ title: 'Settings', headerLargeTitle: true }} />
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          <AppearanceSection />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
