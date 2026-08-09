import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TextSize = 'small' | 'medium' | 'large';

const SCALE: Record<TextSize, number> = {
  small: 0.875,   // 87.5% of base
  medium: 1.0,    // 100%
  large: 1.15,    // 115%
};

interface TextSizeState {
  size: TextSize;
  setSize: (size: TextSize) => void;
  scale: () => number;
}

export const useTextSizeStore = create<TextSizeState>()(
  persist(
    (set, get) => ({
      size: 'medium',
      setSize: (size) => set({ size }),
      scale: () => SCALE[get().size],
    }),
    {
      name: 'studylab-text-size',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
