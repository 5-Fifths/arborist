'use client';

import { useMemo } from "react";

import Timer from "./_components/Timer/Timer";

import styles from "./styles.module.css";

export default function Focus() {
    // Format date string
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
        <main className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{date}</p>
                <p className={styles.welcomeMessage}>Focus</p>
            </div>
            <div className={styles.container}>
                <Timer />
            </div>
        </main>
    )    
}