declare namespace NodeJS {
    interface ProcessEnv {
        EXPO_PUBLIC_API_URL: string;
        EXPO_PUBLIC_API_TIMEOUT: string;
        EXPO_PUBLIC_ENV: 'development' | 'staging' | 'production';
        EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    }
}