import { useTheme } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";

export default function MyLearning() {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
            <Text style={{ color: colors.text, fontSize: 24 }}>hello</Text>
        </View>
    );
}