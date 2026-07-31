import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type OnboardingContextType = {
    hasSeenOnboarding: boolean;
    isLoading: boolean;
    completeOnboarding: () => Promise<void>;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('@has_seen_onboarding');
                if (value === 'true') setHasSeenOnboarding(true);
            } catch (e) {
                console.error('Error checking onboarding status', e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const completeOnboarding = async () => {
        await AsyncStorage.setItem('@has_seen_onboarding', 'true');
        setHasSeenOnboarding(true); // 🔑 updates state immediately, no stale bounce
    };

    return (
        <OnboardingContext.Provider value={{ hasSeenOnboarding, isLoading, completeOnboarding }}>
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const ctx = useContext(OnboardingContext);
    if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
    return ctx;
}