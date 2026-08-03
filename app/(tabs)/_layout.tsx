import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/theme';
import { HapticTab } from '@/src/components/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useAuthStore } from '@/src/store/auth-store';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
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
        name='my-learning'
        options={{
          title: 'My Learning',
          href: isAuthenticated ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle-outline" color={color} size={size} />
          )
        }}

      />

      <Tabs.Screen
        name="profile"
        options={{
          title: isAuthenticated ? 'Profile' : 'Account',
          tabBarIcon: ({ color, size }) =>
            // <IconSymbol size={28} name="profile" color={color} />,
            <Ionicons
              name={isAuthenticated ? 'person-circle-outline' : 'person-outline'}
              color={color}
              size={size}
            />
        }}
      />
    </Tabs>
  );
}
