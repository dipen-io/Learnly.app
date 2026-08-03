// src/hooks/use-gated-action.ts

import { useRouter } from "expo-router";
import { useAuthStore } from "../store/auth-store";
import { usePendingActionStore } from "../store/pending-action-store";

export function useGatedAction() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const setPendingAction = usePendingActionStore((s) => s.setPendingAction);

    /**
     * Wrap any action that requires auth. If logged in, runs immediately.
     * If guest, parks the action and pushes the login screen — the action
     * fires automatically once login succeeds (see pending-action-store).
     *
     * Usage:
     *   const { guard } = useGatedAction();
     *   <Pressable onPress={() => guard(() => addToWishlist(courseId))}>
     */

    function guard(action: () => void | Promise<void>) {
        if (isAuthenticated) {
            action();
            return;
        }
        setPendingAction(action);
        router.push('/(auth)/login');
    }

    return { guard, isAuthenticated };
}