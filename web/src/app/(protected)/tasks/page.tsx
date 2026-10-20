'use client';

import { useMemo } from "react";

import styles from "./styles.module.css";

export default function TasksPage() {
    const date = useMemo(() => { 
            return new Date(Date.now()).toLocaleDateString(
                undefined, 
                {
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                }
            ).replace(/,/g, ' ּּּ· ');
        }, []);

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{date}</p>
                <p className={styles.welcomeMessage}>Tasks</p>
            </div>
            <div className={styles.mainContainer}>
                
            </div>
        </main>
    )
}