'use client';

import { 
    createContext, 
    useState,
    Dispatch,
    SetStateAction
} from "react";
import { User } from "firebase/auth";

export const AuthContext = createContext({ 
    user: null as User | null,
    setUser: (value: User | null) => {}
});

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
