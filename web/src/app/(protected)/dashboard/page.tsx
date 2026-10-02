'use client';

import { useState } from "react";
import { useProtectedRoute } from "../_util/useProtectedRoute";
import { useUserRef } from "../_util/useUserRef";
import { Task, Project } from "@/types/WorkItem";
import { uploadWorkItem } from "@/firebase/uploadWorkItem";

import Modal from "@/components/Modal/Modal";
import WorkItemCreationForm from "../WorkItemCreationForm/WorkItemCreationForm";
import DashboardSection from "../DashboardSection/DashboardSection";
import DashboardTask from "../DashboardWorkItem/DashboardTask/DashboardTask";
import DashboardProject from "../DashboardWorkItem/DashboardProject/DashboardProject";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

import styles from "./styles.module.css";

export default function Dashboard() {
    const { 
        user, 
        isLoading: authLoading 
    } = useProtectedRoute();

    const { 
        userRef,
        isLoading: refLoading, 
        isError, 
        error 
    } = useUserRef();

    const [modalType, setModalType] = useState<"Task" | "Project" | "Urgent Task">();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalError, setModalError] = useState<string | undefined>(undefined)
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    // Format date string
    const date = new Date(Date.now()).toLocaleDateString(
        undefined, 
        {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }
    ).replace(/,/g, ' ּּּ· ');

    // Handle task completion toggling
    const onComplete = (id: string, type: "Project" | "Task") => {
        if (type === "Project") {
            setProjects(prev =>
                prev.map(project =>
                    project.item_id === id ?
                    { ...project, complete: !project.complete }
                    : project
                )
            );
        }
        else {
            setTasks(prev =>
                prev.map(task =>
                    task.item_id === id ? 
                    { ...task, complete: !task.complete }
                    : task
                )
            );
        }
    };

    // Prevent flash of content before user is initialized
    if (!user || authLoading || refLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{date}</p>
                <p className={styles.welcomeMessage}>{user.displayName ? `${user.displayName}'s ` : ''}Dashboard</p>
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
                                
                                if (modalType === "Project") {
                                    setProjects(prev => [...prev, workItem]);
                                }
                                else {
                                    setTasks(prev => [...prev, workItem]);
                                }

                                uploadWorkItem(user, workItem);
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