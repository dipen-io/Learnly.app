import React from 'react';
import { View } from 'react-native';
import { SettingsSection } from '@/src/components/settings/settings-section';
import { SettingsRow } from '@/src/components/settings/settings-row';
import { SettingsDivider } from '@/src/components/settings/settings-divider';
import { useThemeStore } from '@/src/store/theme-store';
import { useTheme } from '@/constants/theme';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import type { ThemeMode } from '@/src/store/theme-store';

const OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System Default' },
];

export function AppearanceSection() {
  const { mode, resolvedMode } = useTheme();
  const setMode = useThemeStore((s) => s.setMode);

  return (
    <SettingsSection
      title="Appearance"
      footer="Choose how StudyLab looks on your device."
    >
      {OPTIONS.map((option, index) => (
        <View key={option.value}>
          <SettingsRow
            label={option.label}
            showChevron={false}
            detail={
              mode === option.value ? (
                <IconSymbol
                  name="checkmark"
                  size={18}
                  color={resolvedMode === 'dark' ? '#6F947D' : '#2F4F3E'}
                />
              ) : null
            }
            onPress={() => setMode(option.value)}
          />
          {index < OPTIONS.length - 1 && <SettingsDivider inset />}
        </View>
      ))}
    </SettingsSection>
  );
}
