import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/constants/theme';

export function SettingsDivider({ inset = false }: { inset?: boolean }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.border,
        marginLeft: inset ? 56 : 16,
      }}
    />
  );
}
