'use client';

import { useState } from "react";
import { useUpdateWorkItemDoc } from "../_util/useUpdateWorkItemDoc";
import { useCreateWorkItemDoc } from "../_util/useCreateWorkItemDoc";
import { useWorkItems } from "../_util/useWorkItems";
import { useUserRefPath } from "../_util/useUserRefPath";
import { useDate } from "../_util/useDate";
import { WorkItem } from "@/types/WorkItem";
import { formatDate } from "../_util/formatDate";

import styles from "./styles.module.css";

export default function TasksPage() {
    const { userRefPath } = useUserRefPath();
    const {
        projects,
        tasks,
        isLoading,
        isError,
        error
    } = useWorkItems(userRefPath);
    const { date, formattedDate } = useDate();

    const debouncedUpdate = useUpdateWorkItemDoc();
    const createItem = useCreateWorkItemDoc();

    const onComplete = (workItem: WorkItem) => {
        const updatedWorkItem: WorkItem = {
            ...workItem,
            complete: !workItem.complete
        }

        debouncedUpdate(updatedWorkItem);
    }

    const mappedWorkItems = [
        ...(tasks.map((task) => ({
            ...task,
            dateString: formatDate(task.due_date)
        }))),
        ...(projects.map((project) => ({
            ...project,
            dateString: formatDate(project.due_date)
        })))
    ]

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{formattedDate}</p>
                <p className={styles.pageTitle}>Tasks</p>
            </div>
            <div className={styles.mainContainer}>
                
            </div>
        </main>
    )
}