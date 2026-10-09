'use client';

import { Task } from "@/types/WorkItem";
import Tag from "@/components/Tag/Tag";

import styles from "../styles.module.css";

interface DashboardTaskProps {
    task: Task,
    onComplete: (task: Task) => void
}

// WIP: Showing checked status of button

export default function DashboardTask({ task, onComplete }: DashboardTaskProps) {
    // Render only the first tag in the list
    const firstTag = task.tags?.at(0) ?? undefined;

    // Add no-wrap and ellipses for text that overflows
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={task.complete}
                    onChange={() => onComplete(task)}
                />
                <div className={`${styles.title} ${task.complete ? styles.strikethrough : ''}`}>{task.title}</div>
            </div>
            <div className={styles.tagContainer}>
                {firstTag ? 
                <Tag 
                    content={firstTag}
                /> 
                : ''}
            </div>
        </div>
    )
}