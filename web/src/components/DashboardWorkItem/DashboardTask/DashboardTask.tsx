'use client';

import { Task } from "@/types/WorkItem";
import { useState, useEffect } from "react";

import taskStyles from "./DashboardTask.module.css";
import styles from "../styles.module.css";

interface DashboardTaskProps {
    task: Task;
}

// WIP: Showing checked status of button

export default function DashboardTask({ task }: DashboardTaskProps) {
    const [complete, setComplete] = useState(task.complete);

    // Render only the first tag in the list
    const firstTag = task.tags?.at(0) ?? undefined;

    useEffect(() => {
        
    }, [complete])

    const handleSubmit = () => {
        setComplete(!complete);

        // TODO: add firebase logic here too
    }

    // Add no-wrap and ellipses for text that overflows
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <input type="checkbox" className={styles.checkbox} onChange={handleSubmit} checked={complete} />
                <p className={`${styles.title} ${complete ? styles.strikethrough : ''}`}>{task.title}</p>
            </div>
            <div className={styles.tagContainer}>
                {firstTag ? <span className={styles.tag}>{firstTag}</span> : ''}
            </div>
        </div>
    )
}