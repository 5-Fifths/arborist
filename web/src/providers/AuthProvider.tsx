'use client';

import { 
    createContext, 
    useState,
    useEffect
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/globals";

export const AuthContext = createContext({ 
    user: null as User | null,
    setUser: (value: User | null) => {},
    loading: true,
    setLoading: (value: boolean) => {}
});

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Add a listener for user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })

        // Clean up listener
        return unsubscribe;
    })

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
