'use client';

import { useState } from "react";
import { useUpdateWorkItemDoc } from "../_util/useUpdateWorkItemDoc";
import { useCreateWorkItemDoc } from "../_util/useCreateWorkItemDoc";
import { useWorkItems } from "../_util/useWorkItems";
import { useUserRefPath } from "../_util/useUserRefPath";
import { useDate } from "../_util/useDate";
import { WorkItem } from "@/types/WorkItem";

import ListContainer from "../_components/ListContainer/ListContainer";
import Calendar from "./_components/Calendar/Calendar";

import styles from "./styles.module.css";

export default function TasksPage() {
    // const [activeDay, setActiveDay] = useState<
    const { userRefPath } = useUserRefPath();
    const {
        projects,
        tasks,
        isLoading,
        isError,
        error
    } = useWorkItems(userRefPath);
    const { formattedDate } = useDate();

    const debouncedUpdate = useUpdateWorkItemDoc();
    const createItem = useCreateWorkItemDoc();

    const onComplete = (workItem: WorkItem) => {
            const updatedWorkItem: WorkItem = {
                ...workItem,
                complete: !workItem.complete
            }
    
            debouncedUpdate(updatedWorkItem);
        }

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{formattedDate}</p>
                <p className={styles.welcomeMessage}>Tasks</p>
            </div>
            <div className={styles.mainContainer}>
                <Calendar 
                    projects={projects}
                    tasks={tasks}
                />
                <div style={{flex: 2}}>
                    <ListContainer 
                        title={"a"}
                        workItems={[]}
                        onItemComplete={onComplete}
                        onAdd={() => {

                        }}
                    />
                </div>
            </div>
        </main>
    )
}