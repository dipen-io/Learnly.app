// src/features/explore/search-header.tsx

import { Fonts, radii, spacing, useTheme } from "@/constants/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface SearchHeaderProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
}

export function SearchHeader({ value, onChangeText, onSubmit }: SearchHeaderProps) {
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);


    return (
        <View style={styles.wrapper}>
            <View style={[styles.container, { backgroundColor: colors.surface, borderColor: focused ? colors.primary : colors.border }]}>
                <Text style={[styles.icon, { color: colors.textMuted }]}>🔍</Text>
            </View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search courses, skills, instructors..."
                placeholderTextColor={colors.textMuted}
                style={[styles.input, { color: colors.text }]}
                returnKeyType="search"
            />

            {value.length > 0 && (
                <Pressable onPress={() => onChangeText('')}>
                    <Text style={[styles.clear, { color: colors.textMuted }]}>✕</Text>
                </Pressable>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        borderRadius: radii.md,
        borderWidth: 1,
        gap: spacing.sm,
    },

    icon: {
        fontSize: 16,
    },

    input: {
        flex: 1,
        fontFamily: Fonts.body,
        fontSize: 15,
        lineHeight: 22,
        padding: 0,
    },

    clear: {
        fontSize: 14,
        fontFamily: Fonts.bodySemiBold,
        padding: spacing.xs,
    },
});