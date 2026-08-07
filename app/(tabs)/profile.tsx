// app/(tabs)/profile.tsx [

import React from 'react';
import { StyleSheet, Pressable, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/constants/theme';
import { useAuthStore } from '@/src/store/auth-store';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { IconSymbol } from '@/src/components/ui/icon-symbol';

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
// GUEST VIEW
// =============================================================================

function GuestView() {
  const router = useRouter();
  const { colors, spacing, radii } = useTheme();

  return (
    <View
      style={[
        styles.guestContainer,
        { backgroundColor: colors.background, padding: spacing.xl },
      ]}
    >
      <View style={styles.guestIcon}>
        <IconSymbol name="person.circle" size={64} color={colors.textMuted} />
      </View>

      <ThemedText type="title" style={{ textAlign: 'center', marginBottom: spacing.sm }}>
        You're browsing as a guest
      </ThemedText>

      <ThemedText
        style={[
          styles.guestSubtitle,
          { color: colors.textMuted, marginBottom: spacing.xl },
        ]}
      >
        Log in to track your courses, save progress, and access your purchases
        from any device.
      </ThemedText>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: colors.button,
            borderRadius: radii.md,
            marginBottom: spacing.md,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        onPress={() => router.push('/(auth)/login')}
      >
        <ThemedText
          type="defaultSemiBold"
          style={{ color: colors.buttonText, fontSize: 15 }}
        >
          Log In
        </ThemedText>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.border,
            borderRadius: radii.md,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={() => router.push('/(auth)/signup')}
      >
        <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
          Sign Up
        </ThemedText>
      </Pressable>
    </View>
  );
}

// =============================================================================
// STAT CARD
// =============================================================================

function StatCard({ value, label }: { value: string; label: string }) {
  const { colors, spacing, radii } = useTheme();

  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          paddingVertical: spacing.md,
        },
      ]}
    >
      <ThemedText
        type="defaultSemiBold"
        style={{ fontSize: 20, color: colors.primary, marginBottom: 4 }}
      >
        {value}
      </ThemedText>
      <ThemedText style={{ fontSize: 12, color: colors.textMuted }}>
        {label}
      </ThemedText>
    </View>
  );
}

// =============================================================================
// MENU ROW
// =============================================================================

function MenuRow({ item, isLast }: { item: MenuItem; isLast: boolean }) {
  const router = useRouter();
  const { colors, spacing } = useTheme();

  return (
    <Pressable
      onPress={() => {
        if (item.onPress) {
          item.onPress();
        } else if (item.route) {
          router.push(item.route as any);
        }
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View
        style={[
          styles.menuRow,
          {
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        <IconSymbol
          name={item.icon}
          size={20}
          color={item.destructive ? colors.error : colors.icon}
          style={{ marginRight: spacing.md }}
        />

        <ThemedText
          style={{
            flex: 1,
            fontSize: 16,
            color: item.destructive ? colors.error : colors.text,
          }}
        >
          {item.label}
        </ThemedText>

        {!item.destructive && (
          <IconSymbol name="chevron.right" size={16} color={colors.icon} />
        )}
      </View>

      {!isLast && (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.border,
            marginLeft: 52,
          }}
        />
      )}
    </Pressable>
  );
}

// =============================================================================
// AUTHENTICATED VIEW
// =============================================================================

function AuthenticatedView() {
  const router = useRouter();
  const { colors, spacing, radii } = useTheme();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      id: 'courses',
      label: 'My Courses',
      icon: 'book.fill',
      route: '/(tabs)/my-learning',
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: 'heart.fill',
      route: '/wishlist',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'gearshape.fill',
      route: '/settings',
    },
    {
      id: 'logout',
      label: 'Log Out',
      icon: 'arrow.right.square',
      destructive: true,
      onPress: handleLogout,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { marginTop: spacing.xl, marginBottom: spacing.lg }]}>
        <View
          style={[
            styles.avatarRing,
            {
              borderRadius: radii.full,
              padding: 3,
              backgroundColor: colors.primary,
              marginBottom: spacing.md,
            },
          ]}
        >
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require('../../assets/images/learn.png')
            }
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: colors.surface,
            }}
            contentFit="cover"
            transition={200}
          />
        </View>

        <ThemedText type="title" style={{ fontSize: 22 }}>
          {user?.name || 'Student'}
        </ThemedText>

        <ThemedText style={{ color: colors.textMuted, marginTop: 4 }}>
          {user?.email || 'No email'}
        </ThemedText>
      </View>

      {/* Stats */}
      <View
        style={[
          styles.statsRow,
          {
            gap: spacing.md,
            marginBottom: spacing.xl,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        <StatCard value="12" label="Courses" />
        <StatCard value="4" label="In Progress" />
        <StatCard value="8" label="Completed" />
      </View>

      {/* Menu */}
      <View
        style={[
          styles.menuCard,
          {
            marginHorizontal: spacing.md,
            backgroundColor: colors.surface,
            borderRadius: radii.lg,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.border,
            overflow: 'hidden',
          },
        ]}
      >
        {menuItems.map((item, index) => (
          <MenuRow
            key={item.id}
            item={item}
            isLast={index === menuItems.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

// =============================================================================
// MAIN SCREEN
// =============================================================================

  {/*  {isAuthenticated ? <AuthenticatedView /> : <GuestView />}  */}
export default function ProfileScreen() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
         <AuthenticatedView /> 
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
