'use client';

import { Project, Task } from "@/types/WorkItem";
import { useDate } from "../../../_util/useDate";
import { createDayArray } from "./_util/createDayArray";

import CalendarDay from "../CalendarDay/CalendarDay";

import styles from "./styles.module.css";
import { formatDate } from "@/app/(protected)/_util/formatDate";

interface CalendarProps {
    projects: Project[],
    tasks: Task[]
}

export default function Calendar({ projects, tasks }: CalendarProps) {
    const { date } = useDate();
    const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
    
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

    const daysArray = createDayArray(date);

    const mappedWorkItems = [
        ...(tasks.map((task) => ({
            ...task,
            dateString: formatDate(task.due_date)
        }))),
        ...(projects.map((project) => ({
            ...project,
            dateString: formatDate(project.due_date)
        })))
    ]

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.month}>{month}</span>
            </div>
            <div className={styles.gridContainer}>
                {DAYS.map((day) => <h3 className={styles.gridHeader} key={day}>{day}</h3>)}
                
                {daysArray.map((day) => {
                    return <CalendarDay
                        key={day.dateString}
                        active={day.dateString === formatDate(date)}
                        date={day.date}
                        monthOffset={day.monthOffset}
                        workItems={mappedWorkItems.filter((workItem) => workItem.dateString === day.dateString)}
                    />
                })}
            </div>
        </div>
    )
}