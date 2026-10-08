import { useContext } from "react";

import { AuthContext } from "@/providers/AuthProvider";

// Get the user's document reference
    // We don't expect it to ever change, so we can cache it indefinitely
    // Use caching to ensure that the user's account exists 
export function useUserRefPath() {
    const { user, loading: authLoading } = useContext(AuthContext);

    return {
        userRefPath: user ? `users/${user.uid}` : undefined,
        isLoading: authLoading,
        isError: !user && !authLoading,
        error: !user && !authLoading ? new Error("User is not logged in.") : null
    }
}