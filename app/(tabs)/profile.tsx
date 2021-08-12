// app/(tabs)/profile.tsx [

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/constants/theme';
import { ThemedView } from '@/src/components/themed-view';
import { AccountDetails } from '@/src/features/account/account-Details';
import { useAuthStore } from '@/src/store/auth-store';

// =============================================================================
// MENU ITEM DATA
// =============================================================================

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  destructive?: boolean;
  onPress?: () => void;
}


// =============================================================================
// AUTHENTICATED VIEW
// =============================================================================

function AuthenticatedView() {
  const router = useRouter();
  const { colors, spacing, radii } = useTheme();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  return;
}

// =============================================================================
// MAIN SCREEN
// =============================================================================

{/*  {isAuthenticated ? <AuthenticatedView /> : <GuestView />}  */ }
export default function ProfileScreen() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        {/* <AuthenticatedView /> */}
        <AccountDetails />
      </SafeAreaView>
    </ThemedView>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestIcon: {
    marginBottom: 16,
  },
  guestSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarRing: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  menuCard: {
    // card wrapper
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
