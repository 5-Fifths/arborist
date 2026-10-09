'use client';

import { useState, useMemo } from "react";
import { Task, Project, WorkItem } from "@/types/WorkItem";
import { useCreateWorkItem } from "../_util/useCreateWorkItem";
import { useUpdateWorkItem } from "../_util/useUpdateWorkItem";
import { useUserRefPath } from "../_util/useUserRefPath";
import { useWorkItems } from "../_util/useWorkItems";

import Modal from "@/components/Modal/Modal";
import WorkItemCreationForm from "../WorkItemCreationForm/WorkItemCreationForm";
import DashboardSection from "../DashboardSection/DashboardSection";
import DashboardTask from "../DashboardWorkItem/DashboardTask/DashboardTask";
import DashboardProject from "../DashboardWorkItem/DashboardProject/DashboardProject";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

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

    const createItem = useCreateWorkItem();
    const updateItem = useUpdateWorkItem();

    const [modalType, setModalType] = useState<"Task" | "Project" | "Urgent Task">();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalError, setModalError] = useState<string | undefined>(undefined)

    // Handle completion of a work item
    const onComplete = (workItem: WorkItem) => {
        const updatedWorkItem = {
            ...workItem,
            complete: !workItem.complete
        }

        updateItem.mutate(updatedWorkItem);
    }

    // Format date string
    const date = useMemo(() => { 
        return new Date(Date.now()).toLocaleDateString(
            undefined, 
            {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            }
        ).replace(/,/g, ' ּּּ· ');
    }, []);

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
                <p className={styles.date}>{date}</p>
                <p className={styles.welcomeMessage}>Dashboard</p>
            </div>
            <div className={styles.mainContainer}>
                <DashboardSection
                    title={"TODAY'S TASKS"}
                    workItems={tasks}
                    renderItem={(task: Task) => <DashboardTask key={task.item_id} task={task} onComplete={onComplete} />}
                    onAdd={() => {
                        setModalOpen(true);
                        setModalType("Task");
                    }}
                />  
                <DashboardSection 
                    title={"URGENT TASKS"}
                    workItems={tasks.filter(task => task.tags?.includes("Urgent"))}
                    renderItem={(task: Task) => <DashboardTask key={task.item_id} task={task} onComplete={onComplete} />}
                    onAdd={() => {
                        setModalOpen(true);
                        setModalType("Urgent Task");
                    }}
                />
                <DashboardSection 
                    title={"URGENT PROJECTS"}
                    workItems={projects}
                    renderItem={(project: Project) => <DashboardProject key={project.item_id} project={project} onComplete={onComplete} />}
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