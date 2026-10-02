'use client';

import { 
    createContext, 
    useState,
    useEffect,
    useMemo
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/globals";

export const AuthContext = createContext({ 
    user: null as User | null,
    loading: true,
});

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Add a listener for user state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })

        // Clean up listener
        return unsubscribe;
    }, []);

    const value = useMemo(() => ({
        user,
        loading
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
