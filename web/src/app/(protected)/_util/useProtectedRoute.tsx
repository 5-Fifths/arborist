'use client';

import { User } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

interface protectedRouteProps {
    user: User | null,
    loading: boolean
}

export function useProtectedRoute({user, loading}: protectedRouteProps) {
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router])
}