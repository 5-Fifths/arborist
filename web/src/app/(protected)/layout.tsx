'use client';

import { useProtectedRoute } from "./_util/useProtectedRoute";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import Sidebar from "@/components/Sidebar/Sidebar";

import styles from "./layout.module.css";

export default function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const { isLoading } = useProtectedRoute(); 

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className={styles.container}>
            <Sidebar />
            {children}
        </div>
    )
}