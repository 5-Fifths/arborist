import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserDocRef } from '@/firebase/doc/getUserDocRef';
import { createUserDoc } from '@/firebase/doc/createUserDoc';
import { AuthContext } from "@/providers/AuthProvider";

// Custom hook to get the user's document reference from Firebase
export function useUserRef() {
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

            // Ensure that the user has a Firebase Doc
            if (!response.success) {
                return (await createUserDoc(user.uid)).result;
            }

            // Return the doc ref
            return response.result;
        },
        enabled: Boolean(user?.uid) && !authLoading,
        staleTime: Infinity,
        retry: 1
    });

    return {
        userRef: data,
        isLoading: authLoading || (Boolean(user) && isLoading),
        isError,
        error
    }
}