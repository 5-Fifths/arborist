'use client';

import { useState } from "react";
import { useUpdateWorkItemDoc } from "../_util/useUpdateWorkItemDoc";
import { useCreateWorkItemDoc } from "../_util/useCreateWorkItemDoc";
import { useWorkItems } from "../_util/useWorkItems";
import { useUserRefPath } from "../_util/useUserRefPath";
import { useDate } from "../_util/useDate";
import { WorkItem } from "@/types/WorkItem";
import { formatDate } from "../_util/formatDate";

import ListContainer from "../_components/ListContainer/ListContainer";
import Calendar from "./_components/Calendar/Calendar";

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

    const [activeDay, setActiveDay] = useState(formatDate(date));

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
                <Calendar 
                    mappedWorkItems={mappedWorkItems}
                    onSelectDate={setActiveDay}
                />
                <div style={{flex: 2}}>
                    <ListContainer 
                        title={activeDay}
                        workItems={mappedWorkItems.filter((item) => item.dateString === activeDay)}
                        onItemComplete={onComplete}
                        onAdd={() => {

                        }}
                    />
                </div>
            </div>
        </main>
    )
}