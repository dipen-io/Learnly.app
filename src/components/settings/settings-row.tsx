import { useTheme } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../themed-text";
import { IconSymbol } from "../ui/icon-symbol";

interface SettingsRowProps {
  label: string;
  icon?: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  destructive?: boolean;
  loading?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  showChevron?: boolean;
  detail?: React.ReactNode;
}

export function SettingsRow({
  label,
  icon,
  value,
  toggle,
  toggleValue,
  onToggle,
  destructive,
  loading,
  onPress,
  disabled,
  showChevron = true,
  detail,
}: SettingsRowProps) {
  const { colors } = useTheme();
  const destructiveColor = colors.error;
  const textColor = destructive ? destructiveColor : colors.text;

  const content = (
    <View
      style={[
        styles.row,
        {
          minHeight: 48,
          paddingVertical: 12,
          paddingHorizontal: 16,
        },
        disabled && { opacity: 0.4 },
      ]}
    >
      {icon && (
        <View
          style={{
            width: 28,
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <IconSymbol
            name={icon}
            size={20}
            color={destructive ? destructiveColor : colors.icon}
          />
        </View>
      )}

      <ThemedText
        style={{
          flex: 1,
          fontSize: 16,
          color: textColor,
        }}
        numberOfLines={1}
      >
        {label}
      </ThemedText>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" />
        ) : detail ? (
          detail
        ) : value ? (
          <ThemedText
            style={{
              fontSize: 15,
              color: colors.textMuted,
              maxWidth: 150,
            }}
            numberOfLines={1}
          >
            {value}
          </ThemedText>
        ) : null}

        {toggle && onToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            disabled={disabled}
            trackColor={{
              false: colors.borderStrong,
              true: colors.success,
            }}
            thumbColor="#fff"
          />
        ) : showChevron && !toggle ? (
          <IconSymbol
            name="chevron.right"
            size={16}
            color={colors.icon}
          />
        ) : null}
      </View>
    </View>
  );

  ////////////////////

  if (toggle) return content;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
