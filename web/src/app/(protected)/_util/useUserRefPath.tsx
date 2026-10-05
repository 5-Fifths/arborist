import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserDocRef } from '@/firebase/doc/getUserDocRef';
import { createUserDoc } from '@/firebase/doc/createUserDoc';
import { AuthContext } from "@/providers/AuthProvider";
import { parseExpectedError } from "@/firebase/parseExpectedError";

// Get the user's document reference
    // We don't expect it to ever change, so we can cache it indefinitely
export function useUserRefPath() {
    const { user, loading: authLoading } = useContext(AuthContext);

    const {
        data,
        isLoading,
        isError,
        error
    } =
    useQuery({
        queryKey: ['userDoc', user?.uid],
        queryFn: async () => {
            if (!user) throw new Error("User is not logged in.");

            const response = await getUserDocRef(user.uid);

            if (!response.success) {
                const parsedError = parseExpectedError(response.result);

                throw new Error(parsedError);
            }

            // Return the doc ref path
            return response.result.path;
        },
        enabled: Boolean(user?.uid) && !authLoading,
        staleTime: Infinity,
        retry: 1
    });

    return {
        userRefPath: data,
        isLoading: authLoading || (Boolean(user) && isLoading),
        isError,
        error
    }
}