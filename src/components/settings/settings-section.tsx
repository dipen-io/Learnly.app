import { useTheme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  footer?: string;
}

export function SettingsSection({ title, children, footer }: SettingsSectionProps) {
  const { fontSizes, colors, spacing, radii } = useTheme();

  return (
    <View style={{ paddingVertical: spacing.xs, paddingHorizontal: spacing.md }}>
      <ThemedText
        type="defaultSemiBold"
        style={{
          fontSize: fontSizes.xs,
          marginBottom: spacing.sm,
          marginLeft: 4,
          letterSpacing: 0.6,
          color: colors.textMuted,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </ThemedText>

      <View
        style={{
          borderRadius: radii.lg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        }}
      >
        {children}
      </View>

      {/* {footer && (
        <ThemedText
          style={{
            fontSize: fontSizes.xs,
            marginTop: spacing.sm,
            marginLeft: 4,
            lineHeight: 18,
            color: colors.textMuted,
          }}
        >
          {footer}
        </ThemedText>
      )} */}
    </View>
  );
}
