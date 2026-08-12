import { useTheme } from '@/constants/theme';
import WishlistScreen from '@/src/features/wishlist/wishlist-screen';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function WishlistScreenWrapper() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <WishlistScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the screen takes up full height/width
    },
});