import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function LeftArrowIcon() {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [
                styles.backButton,
                {
                    backgroundColor: colors.backArrow,
                    opacity: pressed ? 0.7 : 1,
                },
            ]}
        >
            <Ionicons
                name="arrow-back"
                size={20}
                color={colors.text}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
});