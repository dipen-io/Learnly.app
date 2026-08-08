//app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';

import { useTheme } from '@/constants/theme';
import { HapticTab } from '@/src/components/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { useAuthStore } from '@/src/store/auth-store';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { colors, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="my-learning"
        options={{
          title: 'My Learning',
          href: isAuthenticated ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: isAuthenticated ? 'Profile' : 'Account',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={isAuthenticated ? 'person-circle-outline' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
