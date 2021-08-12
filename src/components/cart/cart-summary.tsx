import { useTheme } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface CartSummaryProps {
    total: number;
    itemCount: number;
    onCheckout: () => void;
}

export function CartSummary({ total, itemCount, onCheckout }: CartSummaryProps) {
    const { colors, spacing, radii } = useTheme();

    return (
        <ThemedView
            style={[
                styles.container,
                {
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: spacing.md,
                    paddingBottom: spacing.xl,
                    borderRadius: spacing.lg
                },
            ]}
        >
            <View style={styles.row}>
                <ThemedText style={{ color: colors.textMuted, fontSize: 15 }}>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </ThemedText>
                <ThemedText type="title" style={{ fontSize: 20 }}>
                    ${total.toFixed(2)}
                </ThemedText>
            </View>

            <Pressable
                onPress={onCheckout}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.85 : 1,
                    marginTop: spacing.md,
                })}
            >
                <View
                    style={{
                        backgroundColor: colors.button,
                        borderRadius: radii.lg,
                        paddingVertical: spacing.md,
                        alignItems: 'center',
                    }}
                >
                    <ThemedText
                        type="defaultSemiBold"
                        style={{ color: colors.buttonText, fontSize: 16 }}
                    >
                        Checkout
                    </ThemedText>
                </View>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});