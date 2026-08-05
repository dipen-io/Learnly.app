//src/features/account/account-menu-item.tsx


import { useTheme } from "@/constants/theme";
import { ThemedText } from "@/src/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export interface MenuItem {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;

    route?: string;
    destructive: boolean;
    onPress?: () => void;

}

interface AccountMenuItemprops {
    item: MenuItem;
    isLast: boolean;
}

export function AccountMenuItem({ item, isLast }: AccountMenuItemprops) {
    const { colors, spacing, fontSizes } = useTheme();

    const handlePress = () => {
        if (item.onPress) {
            item.onPress();
            return;
        }
        if (item.route) {
            router.push(item.route as any);
        }
    }

    return (
        <Pressable onPress={handlePress}
            style={({ pressed }) => ({
                opacity: pressed ? 0.6 : 1,
            })}
        >
            <View style={[styles.row, {
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.md
            }
            ]}>
                <Ionicons
                    name={item.icon}
                    size={20}
                    color={
                        item.destructive ? colors.error : colors.icon
                    }
                    style={{
                        marginRight: spacing.md
                    }}
                />

                <ThemedText style={{
                    flex: 1,
                    fontSize: fontSizes.md,
                    color: item.destructive ? colors.error : colors.text
                }}>
                    {item.label}

                </ThemedText>

                {
                    !item.destructive && (
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={colors.icon}
                        />
                    )
                }

            </View>

            {!isLast && (
                <View
                    style={{
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: colors.border,
                        marginLeft: 52,
                    }}
                />
            )}
        </Pressable>
    )

}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});