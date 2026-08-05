'use client';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    );
}