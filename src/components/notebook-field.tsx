// src/components/notebook-field.tsx

import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme, spacing, Fonts } from '@/constants/theme';

type NotebookFieldProps = TextInputProps & {
  label: string;
};

export function NotebookField({ label, style, ...rest }: NotebookFieldProps) {
  const { colors, brand } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textMuted }]}>
        {label.toUpperCase()}
      </Text>
      <TextInput
        style={[styles.input, { color: colors.text }, style]}
        placeholderTextColor={colors.textMuted}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      <View
        style={[
          styles.underline,
          { backgroundColor: isFocused ? brand.marigold : colors.border },
          isFocused && styles.underlineFocused,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  input: {
    fontFamily: Fonts.body,
    fontSize: 17,
    paddingVertical: spacing.sm,
  },
  underline: {
    height: 1.5,
  },
  underlineFocused: {
    height: 2,
  },
});

