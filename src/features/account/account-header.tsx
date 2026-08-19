// src/features/account/account-header.tsx

import { useTheme } from "@/constants/theme";
import { ThemedText } from "@/src/components/themed-text";
import type { User } from "@/src/types/user";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";


export function AccountHeader({ name, email, avatar }: User) {
    const { colors, radii, spacing } = useTheme();

    return (
        <>
            <View style={[styles.container, {
                marginTop: spacing.xl,
                marginBottom: spacing.xl
            }]}>

                <View style={[styles.avatarRing, {
                    borderRadius: radii.full,
                    padding: 3,
                    backgroundColor: colors.primary,
                    marginBottom: spacing.md
                }]}>

                    <Image
                        source={
                            avatar ? { uri: avatar }
                                : require('../../../assets/images/learn.png')
                        }
                        style={[styles.avatar, {
                            backgroundColor: colors.surface
                        }]}
                        contentFit="cover"
                        transition={200}
                    />
                </View>

                <ThemedText type="title" style={styles.name}>
                    {name || 'student'}
                </ThemedText>
                <ThemedText style={{ color: colors.textMuted, marginTop: 4 }}>
                    {email || 'No Email'}
                </ThemedText>
            </View >
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 20,
    },

    avatarRing: {
        justifyContent: "center",
        alignItems: "center",
    },

    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
    },

    name: {
        fontSize: 22,
    },
});
