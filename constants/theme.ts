// constants/theme.ts

import { Platform, useColorScheme } from 'react-native';

// =============================================================================
// BRAND
// =============================================================================

export const BrandColors = {
  marigold: '#F2A93B',
  forest:   '#2F4F3E',
  clay:     '#C4432B',
} as const;

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
  xxxl: 64,
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const radii = {
  sm:   4,
  md:   8,
  lg:   12,
  xl:   16,
  full: 9999,
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

/** Custom loaded fonts (Expo/Google Fonts) */
export const Fonts = {
  display:        'Fraunces_600SemiBold_Italic',
  displayRegular: 'Fraunces_500Medium',
  body:           'Inter_400Regular',
  bodyMedium:     'Inter_500Medium',
  bodySemiBold:   'Inter_600SemiBold',
} as const;

/** Platform-native font stacks for web fallback */
export const PlatformFonts = Platform.select({
  ios: {
    sans:   'system-ui',
    serif:  'ui-serif',
    rounded:'ui-rounded',
    mono:   'ui-monospace',
  },
  android: {
    sans:   'normal',
    serif:  'serif',
    rounded:'normal',
    mono:   'monospace',
  },
  web: {
    sans:   "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif:  "Georgia, 'Times New Roman', serif",
    rounded:"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:   "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  default: {
    sans:   'normal',
    serif:  'serif',
    rounded:'normal',
    mono:   'monospace',
  },
});

// =============================================================================
// COLORS
// =============================================================================

export interface ThemeColors {
  // Base canvas
  background: string;
  foreground: string; // default text color on background

  // Surfaces (cards, sheets, inputs)
  surface: string;
  surfaceElevated: string;

  // Text
  text: string;
  textMuted: string;
  textInverse: string;

  // Borders
  border: string;
  borderStrong: string;

  // Actions (buttons, links, tappable rows)
  primary: string;
  primaryForeground: string; // text/icon on primary background

  // Button alias — usually same as primary, but kept separate
  // so you can have e.g. black buttons in light mode without
  // changing your link color
  button: string;
  buttonText: string;

  // Status
  error: string;
  success: string;
  warning: string;

  // Navigation (tabs, headers)
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export const LightColors: ThemeColors = {
  background:  '#FFFFFF',
  foreground:  '#1C2321',

  surface:       '#EEF0EA',
  surfaceElevated:'#FFFFFF',

  text:        '#1C2321',
  textMuted:   '#5B645F',
  textInverse: '#FFFFFF',

  border:       '#D3D6CC',
  borderStrong: '#B8BDB5',

  primary:          '#2F4F3E',
  primaryForeground:'#FFFFFF',

  button:     '#1C2321',
  buttonText: '#FFFFFF',

  error:   '#C4432B',
  success: '#2F4F3E',
  warning: '#F2A93B',

  tint:             '#0A7EA4',
  icon:             '#687076',
  tabIconDefault:   '#687076',
  tabIconSelected:  '#0A7EA4',
};

export const DarkColors: ThemeColors = {
  background: '#151718',
  foreground: '#F5F5F5',

  surface:        '#1C2321',
  surfaceElevated:'#242927',

  text:        '#F5F5F5',
  textMuted:   '#A8ADA9',
  textInverse: '#151718',

  border:       '#343A37',
  borderStrong: '#4A524E',

  primary:          '#6F947D',
  primaryForeground:'#151718',

  button:     '#F5F5F5',
  buttonText: '#151718',

  error:   '#E0644E',
  success: '#6F947D',
  warning: '#F2A93B',

  tint:            '#FFFFFF',
  icon:            '#9BA1A6',
  tabIconDefault:  '#9BA1A6',
  tabIconSelected: '#FFFFFF',
};

// =============================================================================
// SHADOWS / ELEVATION
// =============================================================================

export const LightShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
  },
};

export const DarkShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 6,
  },
};

// =============================================================================
// THEME HOOK  (drop this in any component)
// =============================================================================

export function useTheme() {
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  return {
    colors: isDark ? DarkColors : LightColors,
    shadows: isDark ? DarkShadows : LightShadows,
    isDark,
    spacing,
    radii,
    fonts: Fonts,
    platformFonts: PlatformFonts,
    brand: BrandColors,
  };
}

// =============================================================================
// BACKWARD COMPATIBILITY
// =============================================================================
// Old nested shape so existing screens don't break during migration.
// Remove this once you've switched everything to useTheme().

export const Colors = {
  light: LightColors,
  dark:  DarkColors,
} as const;
