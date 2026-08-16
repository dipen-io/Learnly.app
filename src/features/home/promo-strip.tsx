import { useTheme } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface PromoStripProps {
    content: Record<string, any>; // ← Match Banner type, make everything optional
}

export function PromoStrip({ content }: PromoStripProps) {
    const router = useRouter();
    const { colors, fontSizes, spacing, radii } = useTheme();
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    // Safe access with fallbacks
    const message = content?.message ?? '';
    const bg = content?.bgColor || colors.primary;
    const fg = content?.textColor || colors.primaryForeground;
    const icon = content?.icon;
    const dismissible = content?.dismissible ?? false;
    const cta = content?.cta;

    const handlePress = () => {
        if (!cta?.action) return;
        const { type, value } = cta.action;

        if (type === 'screen') {
            router.push(value as any);
        }
    };

    if (!message) return null;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: bg,
                    marginHorizontal: spacing.md,
                    marginBottom: spacing.md,
                    borderRadius: radii.md,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                },
            ]}
        >
            <View style={styles.row}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={30}
                        color={colors.straberry}
                        style={{ marginRight: spacing.sm }}
                    />
                )}

                <ThemedText
                    style={{
                        flex: 1,
                        fontSize: fontSizes.sm,
                        color: colors.background,
                        fontWeight: '500',
                    }}
                    numberOfLines={2}
                >
                    {message}
                </ThemedText>

                {cta && (
                    <Pressable onPress={handlePress} hitSlop={8}>
                        <ThemedText
                            style={{
                                fontSize: fontSizes.sm,
                                color: colors.backArrow,
                                fontWeight: '700',
                                marginLeft: spacing.sm,
                            }}
                        >
                            {cta.label}
                        </ThemedText>
                    </Pressable>
                )}

                {dismissible && (
                    <Pressable
                        onPress={() => setDismissed(true)}
                        hitSlop={12}
                        style={{ marginLeft: spacing.sm }}
                    >
                        <Ionicons name="close-outline" size={25} color={fg} />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});