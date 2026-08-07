import { View, type ViewProps } from 'react-native';
import React from 'react';
import { useTheme } from '@/constants/theme';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { colors } = useTheme();

  return <View style={[{ backgroundColor: colors.background }, style]} {...otherProps} />;
}
