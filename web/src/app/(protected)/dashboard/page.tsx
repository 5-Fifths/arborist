'use client';

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider"

export default function Dashboard() {
    const router = useRouter();
    const { user, loading } = useContext(AuthContext);

    // Redirect the user if they are not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading]);

    return (
        <>
            <h1>Dashboard</h1>
            <h2>user: {user?.email}</h2>
        </>
    )
}