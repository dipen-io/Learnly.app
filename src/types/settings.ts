export type ThemeMode = 'light' | 'dark' | 'system';

export type NotificationChannel = 'course_reminder' | 'new_content' | 'community' | 'marketing'

export interface UserPreferences {
    theme: ThemeMode;
    language: string;
    textSize: 'small' | 'medium' | 'large';
    notificationFlag: Record<NotificationChannel, boolean>;
}

export interface SetttingSection  {
    id: string;
    title: string;
    items: SettingsItems[];
}

export interface SettingsItems {
    id: string;
    label: string;
    icon?: string;
    type: 'navigate' | 'toggle' | 'picker' | 'destructive' | 'value';
    value?: string | boolean;
    requiresAuth?: boolean;
    onPress?: () => void;
    onToggle?: (value: boolean) => void;
    detail?: string;
}
