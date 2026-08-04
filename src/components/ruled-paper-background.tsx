// src/components/ruled-paper-background.tsx

import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/constants/theme';

const LINE_SPACING = 36;
const MARGIN_OFFSET = 40;

export function RuledPaperBackground({ children }: { children: React.ReactNode }) {
  const { colors, brand } = useTheme();
  const { height } = Dimensions.get('window');
  const lineCount = Math.ceil(height / LINE_SPACING);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.linesContainer} pointerEvents="none">
        {Array.from({ length: lineCount }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.ruleLine,
              { top: i * LINE_SPACING, backgroundColor: colors.border },
            ]}
          />
        ))}
        <View style={[styles.marginLine, { backgroundColor: brand.clay }]} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  ruleLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  marginLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: MARGIN_OFFSET,
    width: 1.5,
    opacity: 0.35,
  },
});

