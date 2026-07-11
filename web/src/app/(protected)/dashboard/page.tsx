'use client';

import { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider"
import { useProtectedRoute } from "../_util/useProtectedRoute";

import styles from "./styles.module.css";

export default function Dashboard() {
    const { user, loading } = useContext(AuthContext);

    // Redirect the user if they are not logged in
    useProtectedRoute({user, loading})

    // TODO: Show loading instead of dashboard while user or loading is not defined appropriately

    const date = new Date(Date.now()).toLocaleDateString(
        undefined, 
        {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }
    );
    const customDate = date.replace(/,/g, ' ּּּ· ');

    return (
        <>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{customDate}</p>
                <p className={styles.welcomeMessage}>{user?.displayName ? `${user.displayName}'s ` : ''}Dashboard</p>
            </div>
            <main className={styles.mainContainer}>
                <section className={styles.sectionTitle}>TODAY'S TASKS</section>
                <section className={styles.sectionTitle}>URGENT PROJECTS</section>
                <section className={styles.sectionTitle}>URGENT TASKS</section>
                <section className={styles.sectionContainer}></section>
                <section className={styles.sectionContainer}></section>
                <section className={styles.sectionContainer}></section>
            </main>
        </>
    )
}