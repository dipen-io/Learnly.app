// src/features/account/account-Details.tsx
import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AccountHeader } from "./account-header";
import { AccountMenu } from "./account-menu";
import { GuestAccountHeader } from "./guest-account-header";
import { LoginOrSignup } from "./loginOrSignup";

export function AccountDetails() {
    const [showLoginSignup, setShowLoginSignup] = useState(true);
    const { colors } = useTheme();

    const isHydrated = useAuthStore((s) => s.isHydrated);        // ADD
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const users = useAuthStore((s) => s.user);

    // CRITICAL: When user becomes authenticated, force-hide the login screen
    useEffect(() => {
        if (isAuthenticated) {
            setShowLoginSignup(false);
        }
    }, [isAuthenticated]);

    // Don't render anything until we know auth state (prevents login flash)
    if (!isHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator color={colors.primary} />
            </View>
        );
    }

    if (showLoginSignup && !isAuthenticated) {
        return (
            <LoginOrSignup onClose={() => setShowLoginSignup(false)} />
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {isAuthenticated ? (
                <>
                    <AccountHeader
                        fullName={users?.fullName}
                        email={users?.email}
                        profilePicture={users?.profilePicture}
                        id={""}
                    />
                </>
            ) : (
                <GuestAccountHeader />
            )}
            <AccountMenu isAuthenticated={isAuthenticated} />
        </View>
    );
}
