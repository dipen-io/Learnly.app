// src/components/ThemeSpinner.tsx

import { useTheme } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from "react-native";


interface ThemeSpinnerProps extends Omit<ActivityIndicatorProps, 'color'> {
    size?: 'small' | 'large' | number;
    color?: string;
}

export function ThemeSpinner({ size = 'small', color, ...props }: ThemeSpinnerProps) {
    const { colors } = useTheme();

    return (
        <ActivityIndicator
            {...props}
            size={size}
            color={color || colors.primary}
        />
    );
}


// Optional: Full-screen overlay version
interface ThemeSpinnerOverlayProps {
    visible: boolean;
}

export function ThemeSpinnerOverlay({ visible }: ThemeSpinnerOverlayProps) {
    const { colors, isDark } = useTheme();

    if (!visible) return null;

    return (
        <View
            style={styles.overlay}>
            <View style={[styles.container, {
                // backgroundColor: isDark ? colors.background : '#FFFFFF'
            }]}>
                <ThemeSpinner size="large" />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    container: {
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
});
