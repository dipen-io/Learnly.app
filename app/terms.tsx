import { useTheme } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function TermsScreen() {
    const { spacing } = useTheme();

    return (
        <ThemedView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Terms of Service' }} />
            <ScrollView
                contentContainerStyle={{ padding: spacing.lg }}
                showsVerticalScrollIndicator={false}
            >
                <ThemedText type="defaultSemiBold" style={{ fontSize: 18, marginBottom: 16 }}>
                    Terms of Service
                </ThemedText>

                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    Welcome to StudyLab. By using our app, you agree to these terms. Please read them carefully.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Using Our Services
                </ThemedText>
                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    You must follow any policies made available to you within the services. Don't misuse our services — for example, don't interfere with them or try to access them using a method other than the interface we provide.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Your Account
                </ThemedText>
                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    You may need a StudyLab account to use some of our services. You are responsible for maintaining the confidentiality of your account information.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Payments & Refunds
                </ThemedText>
                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    Some services may require payment. All purchases are final unless otherwise stated. Refund requests are handled on a case-by-case basis.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Content
                </ThemedText>
                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    Our services allow you to access educational content. You may not copy, distribute, or create derivative works from this content without permission.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Changes to Terms
                </ThemedText>
                <ThemedText style={{ lineHeight: 22, marginBottom: 12 }}>
                    We may modify these terms at any time. We'll post the updated terms in the app, and your continued use means you accept the changes.
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={{ marginTop: 16, marginBottom: 8 }}>
                    Contact
                </ThemedText>
                <ThemedText style={{ lineHeight: 22 }}>
                    Questions about these terms? Reach out at support@studylab.com.
                </ThemedText>
            </ScrollView>
        </ThemedView>
    );
}