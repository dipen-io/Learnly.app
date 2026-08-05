// src/features/account/account-menu.tsx

import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import { AccountMenuItem, MenuItem } from './account-menu-item';
interface AccountMenuProps {
    isAuthenticated: boolean;
}

export function AccountMenu({
    isAuthenticated,
}: AccountMenuProps) {
    const { colors, radii, spacing } = useTheme();

    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: () => {
                        logout();
                        router.replace("/(auth)/login");
                    },
                },
            ]
        );
    };

    const authenticatedItems: MenuItem[] = [
        {
            id: "course",
            label: "My Course",
            icon: "book.fill",
            route: "/course",
            destructive: false
        },
        {
            id: "wishlist",
            label: "Wishlist",
            icon: "heart.fill",
            route: "/wishlist",
            destructive: false
        },
        {
            id: "settings",
            label: "Settings",
            icon: "gearshape.fill",
            route: "/settings",
            destructive: false
        },
        {
            id: "logout",
            label: "Log Out",
            icon: "arrow.right.square",
            destructive: true,
            onPress: handleLogout,
        },
    ];

    const guestItems: MenuItem[] = [
        {
            id: "login",
            label: "Log In",
            icon: "person.fill",
            route: "/(auth)/login",
            destructive: false
        },
        {
            id: "signup",
            label: "Create Account",
            icon: "person.badge.plus",
            route: "/(auth)/signup",
            destructive: false
        },
        {
            id: "settings",
            label: "Settings",
            icon: "gearshape.fill",
            route: "/settings",
            destructive: false
        },
    ];

    const menuItems = isAuthenticated
        ? authenticatedItems
        : guestItems;

    return (
        <View
            style={[
                styles.container,
                {
                    marginHorizontal: spacing.md,
                    backgroundColor: colors.surface,
                    borderRadius: radii.lg,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: colors.border,
                    overflow: "hidden",
                },
            ]}
        >
            {menuItems.map((item, index) => (
                <AccountMenuItem
                    key={item.id}
                    item={item}
                    isLast={index === menuItems.length - 1}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});