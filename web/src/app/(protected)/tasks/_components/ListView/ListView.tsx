import { WorkItem } from "@/types/WorkItem";
import { useModal } from "@/app/(protected)/_hooks/useModal";

import Modal from "@/components/Modal/Modal";
import WorkItemCreationForm from "@/app/(protected)/_components/WorkItemCreationForm/WorkItemCreationForm";
import ListContainer from "@/app/(protected)/_components/ListContainer/ListContainer"

interface ListViewProps {
    workItems: WorkItem[],
    onComplete: (workItem: WorkItem) => void,
    onAdd: (workItem: WorkItem) => void
}

export default function ListView({ workItems, onComplete, onAdd }: ListViewProps) {
    const {
        isOpen,
        setError,
        error,
        open,
        close
    } = useModal();

    return (
        <>
            <ListContainer 
                title={"All Tasks"}
                workItems={workItems.filter(item => item.item_type === "Task")}
                onItemComplete={onComplete}
                onAdd={open}
            />
            <ListContainer 
                title={"All Projects"}
                workItems={workItems.filter(item => item.item_type === "Project")}
                onItemComplete={onComplete}
                onAdd={open}
            />
            <ListContainer 
                title={"Reminders"}
                workItems={workItems}
                onItemComplete={onComplete}
                onAdd={open}
            />

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