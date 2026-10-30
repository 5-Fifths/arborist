'use client';

import { WorkItem } from "@/types/WorkItem";
import { useState } from "react";
import { useDate } from "@/app/(protected)/_util/useDate";
import { formatDate } from "@/app/(protected)/_util/formatDate";
import { useModal } from "@/app/(protected)/_hooks/useModal";

import Modal from "@/components/Modal/Modal";
import WorkItemCreationForm from "@/app/(protected)/_components/WorkItemCreationForm/WorkItemCreationForm";
import ListContainer from "@/app/(protected)/_components/ListContainer/ListContainer";
import Calendar from "../Calendar/Calendar";

interface CalendarViewProps {
    mappedWorkItems: (WorkItem & { dateString: string})[],
    onComplete: (workItem: WorkItem) => void,
    onAdd: (workItem: WorkItem) => void
}

export default function CalendarView({ mappedWorkItems, onComplete, onAdd }: CalendarViewProps) {
    const {
        isOpen,
        setError,
        error,
        open,
        close
    } = useModal();

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
                    onAdd={open}
                />
            </div>
            {isOpen ?
                <Modal
                    onClose={close}  
                    error={error}
                >
                    <WorkItemCreationForm
                        setError={setError}
                        onClose={close}
                        onSubmit={(workItem: WorkItem) => {
                            close();
                            
                            onAdd(workItem);
                        }}
                    />
                </Modal> 
                :
                null
            }
        </>
    )
}
