'use client';

import { useState, useMemo } from "react";
import { Task, Project, WorkItem } from "@/types/WorkItem";
import { useCreateWorkItemDoc } from "../_util/useCreateWorkItemDoc";
import { useUpdateWorkItemDoc } from "../_util/useUpdateWorkItemDoc";
import { useUserRefPath } from "../_util/useUserRefPath";
import { useWorkItems } from "../_util/useWorkItems";
import { useDate } from "../_util/useDate";
import { useRefreshCache } from "../_util/useRefreshCache";

import Modal from "@/components/Modal/Modal";
import WorkItemCreationForm from "../_components/WorkItemCreationForm/WorkItemCreationForm";
import ListContainer from "../_components/ListContainer/ListContainer";
import TaskListItem from "../_components/WorkItems/TaskListItem/TaskListItem";
import ProjectListItem from "../_components/WorkItems/ProjectListItem/ProjectListItem";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
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

    const createItem = useCreateWorkItemDoc();
    const debouncedUpdate = useUpdateWorkItemDoc();

    const [modalType, setModalType] = useState<"Task" | "Project" | "Urgent Task">();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalError, setModalError] = useState<string | undefined>(undefined)

    // Handle completion of a work item
    const onComplete = (workItem: WorkItem) => {
        const updatedWorkItem: WorkItem = {
            ...workItem,
            complete: !workItem.complete
        }

        debouncedUpdate(updatedWorkItem);
    }

    // Format date string
    const { formattedDate } = useDate();

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => !task.complete);
    }, [tasks]);
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => !project.complete);
    }, [projects]);

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

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{formattedDate}</p>
                <div className={styles.horizontal}>
                    <ProgressBar
                        percentageFilled={tasks.filter((task) => task.complete).length / tasks.length}  
                    />
                    <p className={styles.headerText}>{tasks.filter((task) => task.complete).length} of {tasks.length} complete</p>
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
                    workItems={filteredTasks}
                    onItemComplete={onComplete}
                    onAdd={() => {
                        setModalOpen(true);
                        setModalType("Task");
                    }}
                />  
                <ListContainer 
                    title={"URGENT TASKS"}
                    workItems={filteredTasks.filter(task => task.tags?.includes("Urgent"))}
                    onItemComplete={onComplete}
                    onAdd={() => {
                        setModalOpen(true);
                        setModalType("Urgent Task");
                    }}
                />
                <ListContainer 
                    title={"URGENT PROJECTS"}
                    workItems={filteredProjects}
                    onItemComplete={onComplete}
                    onAdd={() => {
                        setModalOpen(true);
                        setModalType("Project");
                    }}
                />

                {modalOpen && modalType ?
                    <Modal
                        onClose={() => {
                            setModalOpen(false);
                            setModalType(undefined);
                        }}  
                        error={modalError}
                    >
                        <WorkItemCreationForm
                            setError={setModalError}
                            type={modalType}
                            onClose={() => {
                                setModalOpen(false);
                                setModalType(undefined);
                            }}
                            onSubmit={(workItem) => {
                                setModalOpen(false);
                                setModalType(undefined);
                                
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