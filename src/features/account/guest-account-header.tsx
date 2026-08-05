// src/features/account/guest-account-header.tsx

import { useTheme } from "@/constants/theme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

export function GuestAccountHeader() {
    const { spacing } = useTheme();


    return (
        <View style={[styles.container, {
            marginTop: spacing.md
        }]}>
            <Image
                source={require('../../../assets/images/learn.png')}
                style={styles.image}
                contentFit="cover"
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        overflow: "hidden"
    },

    image: {
        width: "100%",
        height: 180
    }
})