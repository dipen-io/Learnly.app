import { useTheme } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface AnnouncementBarProps {
    content: Record<string, any>;
}

const SEVERITY_COLORS: Record<string, { bg: string; fg: string; icon: keyof typeof Ionicons.glyphMap }> = {
    warning: { bg: '#FEF3C7', fg: '#92400E', icon: 'warning-outline' },
    error: { bg: '#FEE2E2', fg: '#991B1B', icon: 'alert-circle-outline' },
    info: { bg: '#DBEAFE', fg: '#1E40AF', icon: 'information-circle-outline' },
    success: { bg: '#D1FAE5', fg: '#065F46', icon: 'checkmark-circle-outline' },
};

export function AnnouncementBar({ content }: AnnouncementBarProps) {
    const { colors, fontSizes, spacing, radii } = useTheme();
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const message = content?.message ?? '';
    const severity = content?.severity ?? 'info';
    const dismissible = content?.dismissible ?? false;

    const severityStyle = SEVERITY_COLORS[severity] || SEVERITY_COLORS.info;

    if (!message) return null;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: severityStyle.bg,
                    marginHorizontal: spacing.md,
                    marginBottom: spacing.md,
                    borderRadius: radii.md,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: severityStyle.fg + '20',
                },
            ]}
        >
            <View style={styles.row}>
                <Ionicons
                    name={severityStyle.icon}
                    size={18}
                    color={severityStyle.fg}
                    style={{ marginRight: spacing.sm }}
                />

                <ThemedText
                    style={{
                        flex: 1,
                        fontSize: fontSizes.sm,
                        color: severityStyle.fg,
                        fontWeight: '500',
                        lineHeight: 20,
                    }}
                    numberOfLines={3}
                >
                    {message}
                </ThemedText>

                {dismissible && (
                    <Pressable
                        onPress={() => setDismissed(true)}
                        hitSlop={12}
                        style={{ marginLeft: spacing.sm }}
                    >
                        <Ionicons name="close-outline" size={18} color={severityStyle.fg} />
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