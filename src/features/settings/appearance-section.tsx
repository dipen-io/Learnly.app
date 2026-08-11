import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    UIManager,
    View,
} from 'react-native';

import { useTheme } from '@/constants/theme';
import { SettingsDivider } from '@/src/components/settings/settings-divider';
import { SettingsRow } from '@/src/components/settings/settings-row';
import { SettingsSection } from '@/src/components/settings/settings-section';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { useTextSizeStore } from '@/src/store/text-size-store';
import type { ThemeMode } from '@/src/store/theme-store';
import { useThemeStore } from '@/src/store/theme-store';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' },
];

const TEXT_SIZE_OPTIONS: {
    value: 'small' | 'medium' | 'large';
    label: string;
}[] = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
    ];

export function AppearanceSection() {
    const { mode, resolvedMode } = useTheme();

    const setMode = useThemeStore((s) => s.setMode);

    const textSize = useTextSizeStore((s) => s.size);
    const setTextSize = useTextSizeStore((s) => s.setSize);

    const [themeExpanded, setThemeExpanded] = useState(false);
    const [textSizeExpanded, setTextSizeExpanded] = useState(false);

    const toggleTheme = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setThemeExpanded((value) => !value);
    };

    const toggleTextSize = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTextSizeExpanded((value) => !value);
    };

    const checkColor = resolvedMode === 'dark'
        ? '#6F947D'
        : '#2F4F3E';

    return (
        <>
            <SettingsSection
                title="Appearance"
                footer="Choose how StudyLab looks on your device."
            >
                {/* Main Appearance row */}
                <SettingsRow
                    label="Theme"
                    showChevron
                    detail={
                        mode === 'system'
                            ? 'System Default'
                            : mode === 'light'
                                ? 'Light'
                                : 'Dark'
                    }
                    onPress={toggleTheme}
                />

                {/* Animated options */}
                {themeExpanded && (
                    <View>
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
                                                color={checkColor}
                                            />
                                        ) : null
                                    }
                                    onPress={() => setMode(option.value)}
                                />

                                {index < THEME_OPTIONS.length - 1 && (
                                    <SettingsDivider inset />
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </SettingsSection>

            <SettingsSection
                title="Text Size"
                footer="Adjust the reading size across the app."
            >
                {/* Main Text Size row */}
                <SettingsRow
                    label="Text Size"
                    showChevron
                    detail={
                        textSize === 'small'
                            ? 'Small'
                            : textSize === 'medium'
                                ? 'Medium'
                                : 'Large'
                    }
                    onPress={toggleTextSize}
                />

                {/* Animated options */}
                {textSizeExpanded && (
                    <View>
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
                                                color={checkColor}
                                            />
                                        ) : null
                                    }
                                    onPress={() => setTextSize(option.value)}
                                />

                                {index < TEXT_SIZE_OPTIONS.length - 1 && (
                                    <SettingsDivider inset />
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </SettingsSection>
        </>
    );
}