'use client';

import { User } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";

import ensureUserDocExists from '@/firebase/auth/ensureUserDocExists'; 

interface protectedRouteProps {
    user: User | null,
    loading: boolean
}

export function useProtectedRoute({user, loading}: protectedRouteProps) {
    const router = useRouter();

    // Ensure that the user has a Firebase Doc
    useQuery({
        queryKey: ['userDoc', user?.uid],
        queryFn: async () => ensureUserDocExists(user!),
        enabled: !!user && !loading,
        staleTime: 10 * 60 * 1000,
    });

    useEffect(() => {
        // Ensure that there is a Firebase Auth user
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);
}