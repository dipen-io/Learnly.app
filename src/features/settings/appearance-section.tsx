import React from 'react';
import { View } from 'react-native';
import { SettingsSection } from '@/src/components/settings/settings-section';
import { SettingsRow } from '@/src/components/settings/settings-row';
import { SettingsDivider } from '@/src/components/settings/settings-divider';
import { useThemeStore } from '@/src/store/theme-store';
import { useTheme } from '@/constants/theme';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import type { ThemeMode } from '@/src/store/theme-store';
import { useTextSizeStore } from '@/src/store/text-size-store';

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' },
];

const TEXT_SIZE_OPTIONS: { value: 'small' | 'medium' | 'large'; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
];

export function AppearanceSection() {
    const { mode, resolvedMode } = useTheme();
    const setMode = useThemeStore((s) => s.setMode);
    const textSize = useTextSizeStore((s) => s.size);
    const setTextSize = useTextSizeStore((s) => s.setSize);

    return (
        <>
        <SettingsSection
        title="Appearance"
        footer="Choose how StudyLab looks on your device."
        >
        {THEME_OPTIONS.map((option, index) => (
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
            {index < THEME_OPTIONS.length - 1 && <SettingsDivider inset />}
            </View>
        ))}
        </SettingsSection>

        <SettingsSection title="Text Size" footer="Adjust the reading size across the app.">
        {TEXT_SIZE_OPTIONS.map((option, index) => (
            <View key={option.value}>
            <SettingsRow
            label={option.label}
            showChevron={false}
            detail={
                textSize === option.value ? (
                    <IconSymbol
                    name="checkmark"
                    size={18}
                    color={resolvedMode === 'dark' ? '#6F947D' : '#2F4F3E'}
                    />
                ) : null
            }
            onPress={() => setTextSize(option.value)}
            />
            {index < TEXT_SIZE_OPTIONS.length - 1 && <SettingsDivider inset />}
            </View>
        ))}
        </SettingsSection>
        </>
    );
}
