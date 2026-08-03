// src/components/ruled-paper-background.tsx

import { Colors } from "@/constants/theme";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const LINE_SPACING = 36;
const MARGIN_OFFSET = 40;

export function RuledPaperBackground({ children }: { children: React.ReactNode }) {
    const { height } = Dimensions.get('window');
    const lineCount = Math.ceil(height / LINE_SPACING);

    return (
        <View style={styles.container}>
            <View style={styles.linesContainer} pointerEvents="none">
                {Array.from({ length: lineCount }).map((_, i) => (
                    <View
                        key={i}
                        style={[styles.ruleLine, { top: i * LINE_SPACING }]}
                    />
                ))}
                <View style={styles.marginLine} />
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.paper,
    },
    linesContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    ruleLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: Colors.rule,
    },
    marginLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: MARGIN_OFFSET,
        width: 1.5,
        backgroundColor: Colors.clay,
        opacity: 0.35,
    },
});
