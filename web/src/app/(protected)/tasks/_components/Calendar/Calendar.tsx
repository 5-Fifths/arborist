import { WorkItem } from "@/types/WorkItem";
import { useDate } from "../../../_util/useDate";
import { createDayArray } from "./_util/createDayArray";
import { formatDate } from "@/app/(protected)/_util/formatDate";

import CalendarDay from "../CalendarDay/CalendarDay";

import styles from "./styles.module.css";

interface CalendarProps {
    mappedWorkItems: (WorkItem & { dateString: string})[],
    onSelectDate: (dateString: string) => void
}

export default function Calendar({ mappedWorkItems, onSelectDate }: CalendarProps) {
    const { date } = useDate();
    const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
    
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

    const daysArray = createDayArray(date);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.month}>{month}</span>
            </div>
            <div className={styles.gridContainer}>
                {DAYS.map((day) => <h3 className={styles.gridHeader} key={day}>{day}</h3>)}
                
                {daysArray.map((day) => {
                    return (
                        <CalendarDay
                            key={day.dateString}
                            active={day.dateString === formatDate(date)}
                            date={day.date}
                            monthOffset={day.monthOffset}
                            workItems={mappedWorkItems.filter((workItem) => workItem.dateString === day.dateString)}
                            onSelect={() => onSelectDate(day.dateString)}
                        />
                    )})}
            </div>
        </div>
    )
}