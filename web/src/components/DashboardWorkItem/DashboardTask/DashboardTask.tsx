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
                <p className={complete ? styles.strikethrough : ''}>{task.title}</p>
            </div>
            <div className={styles.tagContainer}>
                {task.tags?.map((tag) => {
                    return (
                        <div className={styles.tag} key={tag}>{tag}</div>
                    )
                }) ?? ''}
            </div>
        </div>
    )
}