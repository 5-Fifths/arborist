'use client';

import { WorkItem } from "@/types/WorkItem";
import { useState } from "react";
import { useDate } from "@/app/(protected)/_util/useDate";
import { formatDate } from "@/app/(protected)/_util/formatDate";

import ListContainer from "@/app/(protected)/_components/ListContainer/ListContainer";
import Calendar from "../Calendar";

import styles from "./styles.module.css";

interface CalendarViewProps {
    mappedWorkItems: (WorkItem & { dateString: string})[],
    onSelectDate: (dateString: string) => void,
    onComplete: () => void
}

export default function CalendarView({ mappedWorkItems, onSelectDate, onComplete }: CalendarViewProps) {
    const { date } = useDate();
    const [activeDay, setActiveDay] = useState(formatDate(date));

    return (
        <>
            <Calendar 
                mappedWorkItems={mappedWorkItems}
                onSelectDate={setActiveDay}
            />
            <div style={{flex: 2}}>
                <ListContainer 
                    title={activeDay}
                    workItems={mappedWorkItems.filter((item) => item.dateString === activeDay)}
                    onItemComplete={onComplete}
                    onAdd={() => {
                        
                    }}
                />
            </div>
        </>
    )
}
