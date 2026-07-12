'use client';

import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider"
import { useProtectedRoute } from "../_util/useProtectedRoute";
import { WorkItem, Task, Project } from "@/types/WorkItem";
import DashboardSection from "@/components/DashboardSection/DashboardSection";
import DashboardTask from "@/components/DashboardWorkItem/DashboardTask/DashboardTask";
import DashboardProject from "@/components/DashboardWorkItem/DashboardProject/DashboardProject";

import styles from "./styles.module.css";

export default function Dashboard() {
    const { user, loading } = useContext(AuthContext);

    // Redirect the user if they are not logged in
    useProtectedRoute({user, loading});

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
                        renderItem={(task: Task) => {
                            return (
                                <DashboardTask key={task.item_id} task={task} />
                            )
                        }}
                        onAdd={task => setTasks(prev => [...prev, task])}
                    />
                </div>
                <div style={{"flex": 3, "minWidth": 0}}>
                    <DashboardSection 
                        title={"URGENT TASKS"}
                        workItems={urgentTasks}
                        renderItem={(task: Task) => {
                            return (
                                <DashboardTask key={task.item_id} task={task} />
                            )
                        }}
                        onAdd={project => setProjects(prev => [...prev, project])}
                    />
                </div>
                <div style={{"flex": 3, "minWidth": 0}}>
                    <DashboardSection 
                        title={"URGENT PROJECTS"}
                        workItems={projects}
                        renderItem={(project: Project) => {
                            return (
                                <DashboardProject key={project.item_id} project={project}/>
                            )
                        }}
                        onAdd={task => setUrgentTasks(prev => [...prev, task])}
                    />
                </div>
            </div>
        </main>
    )
}