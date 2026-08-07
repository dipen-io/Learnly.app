import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { useThemeStore } from '@/src/store/theme-store';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export function useResolvedTheme() {
  const systemScheme = useColorScheme() ?? 'light';
  const storedMode = useThemeStore((s) => s.mode);

  const resolvedScheme =
    storedMode === 'system' ? systemScheme : storedMode;

  const isDark = resolvedScheme === 'dark';

  // React Navigation theme
  const navigationTheme = useMemo(
    () => (isDark ? DarkTheme : DefaultTheme),
    [isDark]
  );

  return {
    mode: storedMode,
    resolvedScheme,
    isDark,
    navigationTheme,
  };
}
