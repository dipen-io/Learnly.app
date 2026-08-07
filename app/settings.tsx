import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppearanceSection } from '@/src/features/settings/appearance-section';
import { useTheme } from '@react-navigation/native';

export default function SettingsScreen() {
  const { colors } = useTheme();
  

  return (
    <View style={[styles.container, {backgroundImage: colors.background}]}>
      <Stack.Screen options={{ title: 'Settings', headerLargeTitle: true }} />
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          <AppearanceSection />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
