import { WorkItem } from "@/types/WorkItem";

import Event from "../Event/Event"

import styles from "./styles.module.css";

interface CalendarDayProps {
    active: boolean,
    date: number,
    monthOffset: 'prev' | 'curr' | 'next',
    workItems: WorkItem[]
}

export default function CalendarDay({ date, active, monthOffset, workItems }: CalendarDayProps) {
    const MAX_DISPLAYED = 2;

    const lengthExceeded = workItems.length > MAX_DISPLAYED;

    const displayedEvents = lengthExceeded ?
        workItems.slice(0, MAX_DISPLAYED) :
        workItems;

    return (
        <div className={styles.container}>
            <div className={styles.dateLine}>
                <span className={`${monthOffset === 'curr' ? styles.date : styles.fadedDate} ${active ? styles.current : null}`}>{date}</span>
            </div>

            {
                displayedEvents ? 
                    displayedEvents.map((workItem) => {
                        return (
                            <Event
                                key={workItem.item_id}
                                workItem={workItem}
                            />
                        )
                    }) 
                    : null
            }
            <p className={styles.additional}>{lengthExceeded ? `+${workItems.length - displayedEvents.length} more...` : null}</p>
                
        </div>
    )
}