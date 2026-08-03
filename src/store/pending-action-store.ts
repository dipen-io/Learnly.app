// src/store/pending-action-store.ts

import { create } from "zustand";

type PendingActionState = {
    pendingAction: (() => void | Promise<void>) | null;
    setPendingAction: (action: () => void | Promise<void>) => void;
    runPendingAction: () => Promise<void>;
    clearPendingAction: () => void;
};

export const usePendingActionStore = create<PendingActionState>((set, get) => ({
    pendingAction: null,

    setPendingAction: (action) => set({ pendingAction: action }),

    runPendingAction: async () => {
        const action = get().pendingAction;
        set({ pendingAction: null }); // clear first , avoid duble free
        if (action) {
            await action();
        }
    },
    clearPendingAction: () => set({ pendingAction: null })

}))