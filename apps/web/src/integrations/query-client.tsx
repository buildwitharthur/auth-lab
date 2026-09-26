import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { PropsWithChildren, ReactNode } from 'react'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
})

export function QueryClientIntegration({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
