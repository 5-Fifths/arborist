'use client';

import { useUpdateWorkItemDoc } from "../_util/useUpdateWorkItemDoc";
import { useCreateWorkItemDoc } from "../_util/useCreateWorkItemDoc";
import { useWorkItems } from "../_util/useWorkItems";
import { useUserRefPath } from "../_util/useUserRefPath";
import { useDate } from "../_util/useDate";

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

    const updateItem = useUpdateWorkItemDoc();
    const createItem = useCreateWorkItemDoc();

    const { formattedDate } = useDate();

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
                <aside className={styles.infoBar}>
                    a
                </aside>
            </div>
        </main>
    )
}