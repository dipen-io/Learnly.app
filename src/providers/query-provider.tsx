// src/providers/query-provider.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Course catalog etc. doesn't change every second — avoid refetching
            // on every screen focus by default. Override per-hook where you DO
            // want fresh data (e.g. My Learning progress, Cart).
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1, // don't hammer a broken endpoint 3x by default
        },
    },
});

export function QueryProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
