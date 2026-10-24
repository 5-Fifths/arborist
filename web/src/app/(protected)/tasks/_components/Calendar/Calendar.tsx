import { Project, Task } from "@/types/WorkItem";
import { useDate } from "../../../_util/useDate";

import styles from "./styles.module.css";
import { createDayArray } from "./_util/createDayArray";

interface CalendarProps {
    projects: Project[],
    tasks: Task[]
}

export default function Calendar({ projects, tasks }: CalendarProps) {
    const { date } = useDate();
    const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
    
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

    const daysArray = createDayArray(date);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.month}>{month}</p>
            </div>
            <div className={styles.gridContainer}>
                {DAYS.map((day) => <h3 className={styles.gridHeader}>{day}</h3>)}
                
                {daysArray.map((day) => <div className={styles.cell}>{day.date}</div>)}
            </div>
        </div>
    )
}