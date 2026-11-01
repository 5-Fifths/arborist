'use client';

import { useState } from "react";
import { WorkItem } from "@/types/WorkItem";
import { useCreateWorkItemDoc } from "../_hooks/useCreateWorkItemDoc";
import { useUpdateWorkItemDoc } from "../_hooks/useUpdateWorkItemDoc";
import { useUserRefPath } from "../_hooks/useUserRefPath";
import { useWorkItems } from "../_hooks/useWorkItems";
import { useDate } from "../_hooks/useDate";
import { useRefreshCache } from "../_hooks/useRefreshCache";
import { useModal } from "../_hooks/useModal";
import { formatDate } from "../_util/formatDate";

import Modal from "@/assets/components/Modal/Modal";
import WorkItemCreationForm from "../_components/WorkItemCreationForm/WorkItemCreationForm";
import ListContainer from "../_components/ListContainer/ListContainer";
import LoadingScreen from "@/assets/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/assets/components/ErrorScreen/ErrorScreen";
import ProgressBar from "@/assets/components/ProgressBar/ProgressBar";
import RefreshIcon from "@/assets/icons/RefreshIcon.svg";

import styles from "./styles.module.css";

export default function Dashboard() {
    const { 
        userRefPath,
        isLoading: isRefLoading,
        isError: isRefError,
        error: refError
    } = useUserRefPath();

    const {
        projects,
        tasks,
        isLoading: isWorkItemsLoading,
        isError: isWorkItemsError,
        error: workItemsError
    } = useWorkItems(userRefPath);

    const { 
        refreshCache, 
        isCooldown 
    } = useRefreshCache();

    const {
        isOpen,
        error,
        setError,
        open,
        close,
    } = useModal();

    const createItem = useCreateWorkItemDoc();
    const debouncedUpdate = useUpdateWorkItemDoc();

    // Handle completion of a work item
    const onComplete = (workItem: WorkItem) => {
        const updatedWorkItem: WorkItem = {
            ...workItem,
            complete: !workItem.complete
        }

        debouncedUpdate(updatedWorkItem);
    }

    // Format date string
    const { date, formattedDate } = useDate();

    // Prevent flash of content before user is initialized
    if (isRefLoading || isWorkItemsLoading) {
        return (
            <LoadingScreen />
        )
    }

    // Handle error while fetching user doc
    if (isRefError || isWorkItemsError) {
        return (
            <ErrorScreen error={refError || workItemsError} />
        )
    }

    const dailyTasks = tasks.filter(task => formatDate(task.due_date) === formatDate(date));

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{formattedDate}</p>
                <div className={styles.pageTitle}>Dashboard</div>
                <div className={styles.horizontal}>
                    <ProgressBar
                        percentageFilled={
                            dailyTasks.filter((task) => task.complete).length / dailyTasks.length
                        }  
                    />
                    <p className={styles.headerText}>
                        {dailyTasks.filter((task) => task.complete).length} of {dailyTasks.length} complete
                    </p>
                    <button className={styles.refreshButton} onClick={() => refreshCache()}>
                        <img 
                            src={RefreshIcon.src}
                            alt="Refresh"
                            className={`${styles.refreshImage} ${isCooldown ? styles.animated : ''}`} 
                        />
                    </button>
                </div>
            </div>
            <div className={styles.mainContainer}>
                <ListContainer
                    title={"TODAY'S TASKS"}
                    workItems={tasks.filter((task) => formatDate(task.due_date) === formatDate(date))}
                    onItemComplete={onComplete}
                    onAdd={open}
                />  
                <ListContainer 
                    title={"URGENT TASKS"}
                    workItems={tasks.filter(task => task.tags?.includes("Urgent"))}
                    onItemComplete={onComplete}
                    onAdd={open}
                />
                <ListContainer 
                    title={"URGENT PROJECTS"}
                    workItems={projects.filter((project) => project.tags?.includes("Urgent"))}
                    onItemComplete={onComplete}
                    onAdd={open}
                />

                {isOpen ?
                    <Modal
                        onClose={close}  
                        error={error}
                    >
                        <WorkItemCreationForm
                            setError={setError}
                            onClose={close}
                            onSubmit={(workItem) => {
                                close();
                                
                                createItem.mutate(workItem);
                            }}
                        />
                    </Modal> 
                    :
                    null
                }
            </div>
        </main>
    )
}