'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthProvider';
import { verifySessionCookie } from '@/services/verifySessionCookie';

// Ensure that the user is logged in
export function useProtectedRoute() {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        async function checkAuthSession() {
            const isAuthenticated = await verifySessionCookie();

            if (!isAuthenticated.success) {
                router.push("/login");
            }
        }

        checkAuthSession();

        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    return {
        user,
        isLoading: !user && loading,
    }
}