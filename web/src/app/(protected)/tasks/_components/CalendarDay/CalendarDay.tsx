import { WorkItem } from "@/types/WorkItem";

import Event from "../Event/Event"

import styles from "./styles.module.css";

interface CalendarDayProps {
    date: number,
    monthOffset: 'prev' | 'curr' | 'next',
    workItems: WorkItem[]
}

export default function CalendarDay({ date, monthOffset, workItems }: CalendarDayProps) {
    return (
        <div className={styles.container}>
            <div className={monthOffset === 'curr' ? styles.date : styles.fadedDate}>{date}</div>

            {
                workItems ? 
                    workItems.map((workItem) => {
                        return (
                            <Event
                                workItem={workItem}
                            />
                        )
                    }) 
                    : null
            }
        </div>
    )
}