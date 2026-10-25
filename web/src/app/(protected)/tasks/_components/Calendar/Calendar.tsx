import { Project, Task } from "@/types/WorkItem";
import { useDate } from "../../../_util/useDate";
import { createDayArray } from "./_util/createDayArray";

import CalendarDay from "../CalendarDay/CalendarDay";

import styles from "./styles.module.css";

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
                {DAYS.map((day) => <h3 className={styles.gridHeader} key={day}>{day}</h3>)}
                
                {daysArray.map((day) => 
                    <CalendarDay
                        key={day.dateString}
                        date={day.date}
                        monthOffset={day.monthOffset}
                        workItems={tasks}
                    />
                )}
            </div>
        </div>
    )
}