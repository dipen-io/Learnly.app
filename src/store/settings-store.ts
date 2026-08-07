import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemeMode, UserPreferences } from '../types/settings'; 

interface SettingsState {
  // Local preferences (persisted, work offline)
  theme: ThemeMode;
  language: string;
  textSize: 'small' | 'medium' | 'large';
  // Server-synced preferences
  serverPreferences: Partial<UserPreferences> | null;
  
  // Actions
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: string) => void;
  setTextSize: (size: 'small' | 'medium' | 'large') => void;
  syncWithServer: (prefs: Partial<UserPreferences>) => void;
  reset: () => void;
}

const DEFAULTS = {
  theme: 'system' as ThemeMode,
  language: 'en',
  textSize: 'medium' as const,
  serverPreferences: null,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setTextSize: (textSize) => set({ textSize }),
      
      syncWithServer: (serverPreferences) => set({ serverPreferences }),
      
      reset: () => set(DEFAULTS),
    }),
    {
      name: 'studyLab-settings',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist local settings, not server data
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        textSize: state.textSize,
      }),
    }
  )
);
