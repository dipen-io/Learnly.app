// app/(tabs)/profile.tsx

import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const {colors }= useTheme();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  

  if (!isAuthenticated) {
    return (
  <View style={[styles.stubContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.stubTitle, { color: colors.text }]}>
          You're browsing as a guest
        </Text>
        <Text style={[styles.stubSubtitle, { color: colors.textMuted }]}>
          Log in to track your courses, save progress, and access your
          purchases from any device.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: colors.button },
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={[styles.primaryButtonText, { color: colors.buttonText }]}>
            Log In
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            { borderColor: colors.border },
            pressed && { backgroundColor: colors.surface },
          ]}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={require('../../assets/images/learn.png')}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>

        <Text style={styles.name}>Dinesh Boro</Text>
        <Text style={styles.email}>borod9200@gmail.com</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logout]}
          onPress={() => logout()}
        >
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  stubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  stubTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  stubSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 15,
  },

  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0D6EFD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  email: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D6EFD',
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
  menu: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  logout: {
    marginTop: 8,
  },
  logoutText: {
    color: '#D00000',
  },
});
