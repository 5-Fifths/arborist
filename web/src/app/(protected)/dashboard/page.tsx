'use client';

import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider"
import { useProtectedRoute } from "../_util/useProtectedRoute";
import { Task, Project } from "@/types/WorkItem";
import { uploadWorkItem } from "@/firebase/uploadWorkItem";

import WorkItemCreationModal from "../WorkItemCreationModal/WorkItemCreationModal";
import DashboardSection from "../DashboardSection/DashboardSection";
import DashboardTask from "../DashboardWorkItem/DashboardTask/DashboardTask";
import DashboardProject from "../DashboardWorkItem/DashboardProject/DashboardProject";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

import styles from "./styles.module.css";

export default function Dashboard() {
    const { user, loading } = useContext(AuthContext);

    // Redirect the user if they are not logged in
    useProtectedRoute({user, loading});

    const [modalType, setModalType] = useState<"Task" | "Project" | "Urgent Task">();
    const [modalOpen, setModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    const date = new Date(Date.now()).toLocaleDateString(
        undefined, 
        {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }
    ).replace(/,/g, ' ּּּ· ');

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

    if (!user || loading) {
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
                <div style={{"flex": 4, "minWidth": 0}}>
                    <DashboardSection
                        title={"TODAY'S TASKS"}
                        workItems={tasks}
                        renderItem={(task: Task) => <DashboardTask key={task.item_id} task={task} onComplete={onComplete} />}
                        onAdd={() => {
                            setModalOpen(true);
                            setModalType("Task");
                        }}
                    />
                </div>
                <div style={{"flex": 3, "minWidth": 0}}>
                    <DashboardSection 
                        title={"URGENT TASKS"}
                        workItems={tasks.filter(task => task.tags?.includes("Urgent"))}
                        renderItem={(task: Task) => <DashboardTask key={task.item_id} task={task} onComplete={onComplete} />}
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
                        renderItem={(project: Project) => <DashboardProject key={project.item_id} project={project} onComplete={onComplete} />}
                        onAdd={() => {
                            setModalOpen(true);
                            setModalType("Project");
                        }}
                    />
                </div>

                {modalOpen && modalType ?
                    <WorkItemCreationModal 
                        type={modalType}
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