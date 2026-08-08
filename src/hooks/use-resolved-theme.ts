// /src/hooks/use-resolved-theme.ts

import { useColorScheme } from "react-native";
import { useMemo } from "react";
import { useThemeStore } from "@/src/store/theme-store";
import {
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";

import { LightColors, DarkColors } from "@/constants/theme";

export function useResolvedTheme() {
    const systemScheme = useColorScheme() ?? "light";
    const storedMode = useThemeStore((s) => s.mode);

    const resolvedScheme =
        storedMode === "system"
            ? systemScheme
            : storedMode;

    const isDark = resolvedScheme === "dark";

    const colors = isDark
        ? DarkColors
        : LightColors;

    const navigationTheme = useMemo(() => {
        const baseTheme = isDark
            ? DarkTheme
            : DefaultTheme;

        return {
            ...baseTheme,
            dark: isDark,

            colors: {
                ...baseTheme.colors,

                // Navigator/body background
                background: colors.background,

                // Header/card background
                card: colors.background,

                // Header title and icons
                text: colors.text,

                // Active navigation color
                primary: colors.primary,

                // Border/separator color
                border: colors.border,

                notification: colors.primary,
            },
        };
    }, [isDark, colors]);

    return {
        mode: storedMode,
        resolvedScheme,
        isDark,
        colors,
        navigationTheme,
    };
}
