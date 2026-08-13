import { SettingsDivider } from '@/src/components/settings/settings-divider';
import { SettingsRow } from '@/src/components/settings/settings-row';
import { SettingsSection } from '@/src/components/settings/settings-section';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import React from 'react';

export function SupportSection() {
    const appVersion = Constants.expoConfig?.version || '1.0.0';

    return (
        <>
            <SettingsSection title="Support">
                <SettingsRow
                    label="Help Center"
                    onPress={() => Linking.openURL('https://studylab.com/help')}
                />
                <SettingsDivider inset />
                <SettingsRow
                    label="Contact Support"
                    onPress={() => Linking.openURL('mailto:support@studylab.com')}
                />
            </SettingsSection>

            {/* NEW: Legal Section */}
            <SettingsSection title="Legal">
                <SettingsRow
                    label="Privacy Policy"
                    onPress={() => Linking.openURL('https://studylab.com/privacy')}
                />
                <SettingsDivider inset />
                <SettingsRow
                    label="Terms of Service"
                    onPress={() => Linking.openURL('https://studylab.com/terms')}
                />
            </SettingsSection>

            <SettingsSection title="About">
                <SettingsRow
                    label="App Version"
                    value={appVersion}
                    showChevron={false}
                />
            </SettingsSection>
        </>
    );
}