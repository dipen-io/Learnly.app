// src/features/account/account-Details.tsx

import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import React, { useState } from "react";
import { View } from "react-native";
import { AccountHeader } from "./account-header";
import { AccountMenu } from "./account-menu";
import { GuestAccountHeader } from "./guest-account-header";
import { LoginOrSignup } from "./loginOrSignup";


export function AccountDetails() {
    const [showLoginSignup, setShowLoginSignup] = useState(true)
    // const { data: users, isError, isLoading } = useUsers();
    const { colors } = useTheme();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const users = useAuthStore((s) => s.user);


    // if (isError) return null;
    // if (!isLoading && (!users)) return null;
    if (!users) return null;

    if (showLoginSignup && !isAuthenticated) {
        return (
            <LoginOrSignup
                onClose={() => setShowLoginSignup(false)}
            />
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header */}

            {
                isAuthenticated ? (
                    <>
                        <AccountHeader
                            name={users.name}
                            email={users.email}
                            avatar={users.profilePicture} profilePicture={undefined} id={""}
                        />

                        {/* Stats */}

                    </>
                ) : (
                    <GuestAccountHeader />
                )
            }

            {/* Menu */}
            <AccountMenu isAuthenticated={isAuthenticated} />
        </View>
    );
}