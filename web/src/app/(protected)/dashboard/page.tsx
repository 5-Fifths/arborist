'use client';

import React, { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider"
import { useProtectedRoute } from "../_util/useProtectedRoute";
import { WorkItem, Task, Project } from "@/types/WorkItem";

import WorkItemCreationModal from "@/components/WorkItemCreationModal/WorkItemCreationModal";
import DashboardSection from "@/components/DashboardSection/DashboardSection";
import DashboardTask from "@/components/DashboardWorkItem/DashboardTask/DashboardTask";
import DashboardProject from "@/components/DashboardWorkItem/DashboardProject/DashboardProject";

import styles from "./styles.module.css";

export default function Dashboard() {
    const { user, loading } = useContext(AuthContext);

    // Redirect the user if they are not logged in
    useProtectedRoute({user, loading});

    const [newItem, setNewItem] = useState<WorkItem>();
    const [modalType, setModalType] = useState<"Task" | "Project" | "Urgent Task">();
    const [modalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [urgentTasks, setUrgentTasks] = useState<Task[]>([]);

    // TODO: Show loading instead of dashboard while user or loading is not defined appropriately

    const date = new Date(Date.now()).toLocaleDateString(
        undefined, 
        {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }
    ).replace(/,/g, ' ּּּ· ');

    // task => setTasks(prev => [...prev, task])
    // project => setProjects(prev => [...prev, project])
    // task => setUrgentTasks(prev => [...prev, task])

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{date}</p>
                <p className={styles.welcomeMessage}>{user?.displayName ? `${user.displayName}'s ` : ''}Dashboard</p>
            </div>
            <div className={styles.mainContainer}>
                <div style={{"flex": 4, "minWidth": 0}}>
                    <DashboardSection
                        title={"TODAY'S TASKS"}
                        workItems={tasks}
                        renderItem={(task: Task) => <DashboardTask key={task.item_id} task={task} />}
                        onAdd={() => {
                            setModalOpen(true);
                            setModalType("Task");;
                        }}
                    />
                </div>
                <div style={{"flex": 3, "minWidth": 0}}>
                    <DashboardSection 
                        title={"URGENT TASKS"}
                        workItems={urgentTasks}
                        renderItem={(task: Task) => <DashboardTask key={task.item_id} task={task} />}
                        onAdd={() => {
                            setModalOpen(true);
                            setModalType("Urgent Task");
                        }}
                    />
                </div>
                <div style={{"flex": 3, "minWidth": 0}}>
                    <DashboardSection 
                        title={"URGENT PROJECTS"}
                        workItems={projects}
                        renderItem={(project: Project) => <DashboardProject key={project.item_id} project={project}/>}
                        onAdd={() => {
                            setModalOpen(true);
                            setModalType("Project");;
                        }}
                    />
                </div>

                {modalOpen && modalType ?
                    <WorkItemCreationModal 
                        type={modalType}
                        onSubmit={() => {
                            setModalOpen(false);
                            setModalType(undefined);
                        }}

                        onClose={() => {
                            setModalOpen(false);
                            setModalType(undefined);
                        }}
                    />
                    :
                    null
                }
            </div>
        </main>
    )
}