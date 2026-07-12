'use client';

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider"
import { useProtectedRoute } from "../_util/useProtectedRoute";
import { Task, Project } from "@/types/WorkItem";
import DashboardSection from "@/components/DashboardSection/DashboardSection";
import DashboardTask from "@/components/DashboardWorkItem/DashboardTask/DashboardTask";
import DashboardProject from "@/components/DashboardWorkItem/DashboardProject/DashboardProject";

import styles from "./styles.module.css";

const dummyTask: Task[] = [
    {
        item_id: "task_1",
        user_id: "user_1",

        item_type: "task",
        title: "task 1task 1task 1task 1task 1task 1task 1task 1task 1task 1task 1task 1task 1task 1task 1task 1",
        description: "task description",
        due_date: new Date(Date.now()),
        complete: false,
        tags: ["csc132", "work"]
    }
]

const dummyProject: Project[] = [{
    item_id: "proj_1",
    user_id: "user_1",

    item_type: "project",
    title: "project 1project 1project 1project 1project 1project 1project 1project 1project 1project 1project 1",
    description: "project description",
    due_date: new Date(Date.now()+(24*60*60*1000*3)),
    complete: false,
    subtasks: [
        {item_id: "task_2", title: "task 2", complete: true},
        {item_id: "task_3", title: "task 3", complete: false},
    ],
    tags: ["csc133", "reminder"]
}]

export default function Dashboard() {
    const { user, loading } = useContext(AuthContext);

    // Redirect the user if they are not logged in
    useProtectedRoute({user, loading});

    // Opens a small form for the user to quickly create a task/project
    const handleAdd = () => {
        
    }

    // TODO: Show loading instead of dashboard while user or loading is not defined appropriately

    const date = new Date(Date.now()).toLocaleDateString(
        undefined, 
        {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }
    );
    const customDate = date.replace(/,/g, ' ּּּ· ');

    return (
        <main className={styles.container}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{customDate}</p>
                <p className={styles.welcomeMessage}>{user?.displayName ? `${user.displayName}'s ` : ''}Dashboard</p>
            </div>
            <div className={styles.mainContainer}>
                <div style={{"flex": 4, "minWidth": 0}}>
                    <DashboardSection
                        title={"TODAY'S TASKS"}
                        workItems={dummyTask}
                        renderItem={(task: Task) => {
                            return (
                                <DashboardTask key={task.item_id} task={task} />
                            )
                        }}
                    />
                </div>
                <div style={{"flex": 3, "minWidth": 0}}>
                    <DashboardSection 
                        title={"URGENT PROJECTS"}
                        workItems={dummyProject}
                        renderItem={(project: Project) => {
                            return (
                                <DashboardProject key={project.item_id} project={project}/>
                            )
                        }}
                    />
                </div>
                <div style={{"flex": 3, "minWidth": 0}}>
                    <DashboardSection 
                        title={"URGENT TASKS"}
                        workItems={dummyTask}
                        renderItem={(task: Task) => {
                            return (
                                <DashboardTask key={task.item_id} task={task} />
                            )
                        }}
                    />
                </div>
            </div>
        </main>
    )
}