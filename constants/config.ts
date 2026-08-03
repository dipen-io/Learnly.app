// constant/config.ts

// single source of truth for env-derived config.
// Rest of the app should import from here , not react process.env direclty

export const config = {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    apiTimeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT ?? 15000),
    env: process.env.EXPO_PUBLIC_ENV ?? 'development',
    stripePublishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    isDev: process.env.EXPO_PUBLIC_ENV === 'development',
    isPod: process.env.EXPO_PUBLIC_ENV == 'production',
} as const;

// Faild fast in dev if something critical missing
if (!config.apiUrl) {
    throw new Error(
        'EXPO_PUBLIC_API_URL is not set. Did you create a .env file from .env.exmple?'
    );
}