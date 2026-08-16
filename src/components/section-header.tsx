// src/components/section-header.tsx

import { useTheme } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { IconSymbol } from './ui/icon-symbol';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onActionPress?: () => void;
}

export function SectionHeader({
    title,
    subtitle,
    actionLabel,
    onActionPress,
}: SectionHeaderProps) {
    const { colors, fontSizes, spacing } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.textBlock}>
                <ThemedText
                    type="defaultSemiBold"
                    style={{ fontSize: fontSizes.lg }}
                >
                    {title}
                </ThemedText>

                {subtitle && (
                    <ThemedText
                        style={{
                            fontSize: fontSizes.sm,
                            color: colors.textMuted,
                            marginTop: 2,
                        }}
                    >
                        {subtitle}
                    </ThemedText>
                )}
            </View>

            {actionLabel && onActionPress && (
                <Pressable
                    onPress={onActionPress}
                    hitSlop={12}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.6 : 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                    })}
                >
                    <ThemedText
                        style={{
                            fontSize: fontSizes.sm,
                            color: colors.primary,
                            fontWeight: '600',
                        }}
                    >
                        {actionLabel}
                    </ThemedText>
                    <IconSymbol
                        name="chevron.right"
                        size={14}
                        color={colors.primary}
                    />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 10
    },
    textBlock: {
        flex: 1,
        marginRight: 8,
    },
});