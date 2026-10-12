'use client';

import { Project } from "@/types/WorkItem";

import Tag from "@/components/Tag/Tag";

import projectStyles from "./DashboardProject.module.css";
import styles from "../styles.module.css";

interface DashboardProjectProps {
    project: Project,
    onComplete: (project: Project) => void
}

function countCompletedSubtasks(project: Project) {
    if (project.subtasks) {
        const list = project.subtasks;
        const n = list.length;
        let total = 0;
        
        for (let task = 0; task < n; task++) {
            if (list[task].complete) {
                total++;
            }
        }

        return total;
    }

    return 0;
}

export default function DashboardProject({ project, onComplete }: DashboardProjectProps) {
    // Display only the first tag in the project
    const firstTag = project.tags?.at(0) ?? undefined;

    // Math to find out how many days are left until the deadline
    const daysTillDue = Math.ceil(
        (project.due_date.valueOf() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    // Calculate the width of the progress bar
    const totalTasks = project.subtasks?.length ?? 0;
    const completedTasks = countCompletedSubtasks(project);
    const percentage = totalTasks > 0 ? 
        completedTasks / totalTasks
        : 0; 

    return (
        <div className={styles.container}>
            <input 
            type="checkbox" 
                className={styles.checkbox} 
                checked={project.complete}
                onChange={() => onComplete(project)} 
            />
            <div className={projectStyles.container}>
                <div className={projectStyles.header}>
                    <div className={`${styles.title} ${project.complete ? styles.strikethrough : ''}`}>{project.title}</div>
                    <div className={styles.tagContainer}>
                        {firstTag ? 
                        <Tag 
                            content={firstTag}
                        /> 
                        : ''}
                    </div>
                </div>
                <div className={projectStyles.progressBarContainer}>
                    <div className={projectStyles.progressBar} style={{'width': (project.complete ? 100 : (percentage*100))+'%'}} />
                </div>
                <div className={projectStyles.footer}>
                    <span className={projectStyles.percentage}>{project.complete ? 100 : percentage*100}%</span>
                    <p className={projectStyles.daysTillDue}>{daysTillDue}d</p>
                </div>
            </div>
        </div>
        
    )
}