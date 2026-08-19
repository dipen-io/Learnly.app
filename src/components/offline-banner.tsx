//src/components/offline-banner.tsx

import React from "react";
import { View } from "react-native";
import { useNetworkStatus } from "../hooks/use-network-status";
import { ThemedText } from "./themed-text";

export default function OfflineBanner() {
    const { isOffline } = useNetworkStatus();

    if (!isOffline) {
        return null;
    }

    return (
        <View>
            <ThemedText>
                No internet connection
            </ThemedText>
        </View>
    );
}