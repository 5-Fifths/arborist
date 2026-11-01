'use client';

import { useState } from "react";
import { useUpdateWorkItemDoc } from "../_hooks/useUpdateWorkItemDoc";
import { useCreateWorkItemDoc } from "../_hooks/useCreateWorkItemDoc";
import { useWorkItems } from "../_hooks/useWorkItems";
import { useUserRefPath } from "../_hooks/useUserRefPath";
import { useDate } from "../_hooks/useDate";
import { WorkItem } from "@/types/WorkItem";
import { formatDate } from "../_util/formatDate";

import CalendarView from "./_components/CalendarView/CalendarView";
import ListView from "./_components/ListView/ListView";
import SliderToggle from "@/assets/components/SliderToggle/SliderToggle";

import styles from "./styles.module.css";

export default function TasksPage() {
    const [activeView, setActiveView] = useState<"List" | "Calendar">("Calendar");

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
                <div className={styles.horizontal}>
                    <p className={styles.pageTitle}>Tasks</p>
                    <SliderToggle
                        options={{
                            first: "Calendar",
                            second: "List"
                        }}
                        value={activeView === 'Calendar'}
                        setter={() => {setActiveView(prev => prev === "List" ? "Calendar" : "List")}}
                    />
                </div>
            </div>
            <div className={styles.mainContainer}>
                {
                    activeView === "Calendar" ? 
                    <CalendarView 
                        mappedWorkItems={mappedWorkItems}
                        onComplete={onComplete}
                        onAdd={createItem.mutate}
                    /> :
                    <ListView
                        workItems={mappedWorkItems}
                        onComplete={onComplete}
                        onAdd={createItem.mutate}
                    />
                }
            </div>
        </main>
    )
}