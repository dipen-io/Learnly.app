import { useTheme } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function PrivacyScreen() {
    const { spacing } = useTheme();

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Privacy Policy' }} />
            <ScrollView
                contentContainerStyle={{ padding: spacing.lg }}
                showsVerticalScrollIndicator={false}
            >
                <ThemedText type="defaultSemiBold" style={{ fontSize: 18, marginBottom: 16 }}>
                    Privacy Policy
                </ThemedText>

                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    StudyLab respects your privacy. This policy explains how we collect, use, and protect your personal information.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Information We Collect
                </ThemedText>
                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    We collect your name, email, and course progress to provide you with a personalized learning experience.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    How We Use Your Data
                </ThemedText>
                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    Your data is used to track progress, send course notifications, and improve our platform. We never sell your data to third parties.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Contact Us
                </ThemedText>
                <ThemedText style={{ lineHeight: 22 }}>
                    If you have any questions, reach out at support@studylab.com.
                </ThemedText>
            </ScrollView>
        </ThemedView>
    );
}