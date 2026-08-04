// src/components/password-field.tsx
//
// Same "notebook underline" visual style as NotebookField, but with a
// built-in show/hide toggle — kept as a separate component rather than
// adding an eye-icon prop to NotebookField, since the visibility state
// and icon logic are specific to passwords and would just be dead
// weight on every other text field.

import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, spacing, Fonts } from '@/constants/theme';

type PasswordFieldProps = Omit<TextInputProps, 'secureTextEntry'> & {
  label: string;
};

export function PasswordField({ label, style, ...rest }: PasswordFieldProps) {
  const { colors, brand } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textMuted }]}>
        {label.toUpperCase()}
      </Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { color: colors.text }, style]}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={!isVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        <Pressable
          onPress={() => setIsVisible((v) => !v)}
          hitSlop={8}
          style={styles.iconButton}
        >
          <Ionicons
            name={isVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={colors.textMuted}
          />
        </Pressable>
      </View>

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 17,
    paddingVertical: spacing.sm,
  },
  iconButton: {
    paddingLeft: spacing.sm,
    paddingVertical: spacing.xs,
  },
  underline: {
    height: 1.5,
  },
  underlineFocused: {
    height: 2,
  },
});
