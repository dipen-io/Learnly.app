import { AppearanceSection } from '@/src/features/settings/appearance-section';
import { SupportSection } from '@/src/features/settings/support-section';
import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { colors } = useTheme();


  return (
    <View style={[styles.container, { backgroundImage: colors.background }]}>
      <Stack.Screen options={{ title: 'Settings', headerLargeTitle: true }} />
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          <AppearanceSection />
          <SupportSection />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
