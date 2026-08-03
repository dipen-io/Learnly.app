//src/components/notebook-field.tsx

import { Colors, Fonts, spacing } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type NotebookFieldProps = TextInputProps & {
    label: string;
};

export function NotebookField({ label, ...rest }: NotebookFieldProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label.toUpperCase()}</Text>
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                placeholderTextColor={Colors.inkMuted}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />
            <View
                style={[styles.underline, isFocused && styles.underlineFocused]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    label: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 11,
        letterSpacing: 1.2,
        color: Colors.inkMuted,
        marginBottom: spacing.xs,
    },
    input: {
        fontFamily: Fonts.body,
        fontSize: 17,
        color: Colors.ink,
        paddingVertical: spacing.sm,
    },
    inputFocused: {
        color: Colors.ink,
    },
    underline: {
        height: 1.5,
        backgroundColor: Colors.rule,
    },
    underlineFocused: {
        height: 2,
        backgroundColor: Colors.marigold,
    },
});
