// src/features/account/account-Details.tsx

import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import React from "react";
import { View } from "react-native";
import { AccountHeader } from "./account-header";
import { AccountMenu } from "./account-menu";
import { GuestAccountHeader } from "./guest-account-header";
import { useUsers } from "./use-account-section";


export function AccountDetails() {
    const { data: users, isError, isLoading } = useUsers();
    const { colors } = useTheme();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isError) return null;
    if (!isLoading && (!users)) return null;


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Header */}

            {
                isAuthenticated ? (
                    <>
                        <AccountHeader
                            name={users.name}
                            email={users.email}
                            avatar={users.avatar}

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