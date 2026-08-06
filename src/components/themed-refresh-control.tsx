import { useTheme } from "@/constants/theme";
import React from "react";
import { RefreshControl, RefreshControlProps } from "react-native";

interface ThemeRefreshControlProps extends Omit<RefreshControlProps, 'colors' | 'tintColor'> { }

export function ThemeRefreshControl(props: ThemeRefreshControlProps) {
    const { colors, isDark } = useTheme();

    return (
        <RefreshControl
            {...props}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={isDark ? colors.surface : '#FFFFFF'}
            progressViewOffset={100}
        />
    )
}