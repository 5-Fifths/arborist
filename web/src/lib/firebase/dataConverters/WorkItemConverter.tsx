import { WorkItem, TruncatedTask, ItemType } from "@/types/WorkItem";
import { 
    QueryDocumentSnapshot, 
    SnapshotOptions,
    Timestamp 
} from "firebase/firestore";

interface WorkItemDbModel {
    // Identifying information
    item_type: ItemType,
    item_id: string,

    // Item data
    title: string,
    description: string,
    due_date: number,
    complete: boolean,
    subtasks?: TruncatedTask[],
    tags: string[]
}

export const WorkItemConverter = {
    toFirestore(workItem: WorkItem): WorkItemDbModel {
            const truncatedWorkItems = workItem.subtasks?.map((subtask) => ({
                item_id: subtask.item_id,
                title: subtask.title,
                complete: subtask.complete
            })) ?? [];

            const date = workItem.due_date.getTime();

            const result: WorkItemDbModel = {
                item_type: workItem.item_type,
                item_id: workItem.item_id,
    
                title: workItem.title,
                description: workItem.description,
                due_date: date,
                complete: workItem.complete,
                tags: workItem.tags ?? []
            }

            if (workItem.item_type === "Project") {
                result.subtasks = truncatedWorkItems;
            }

            return result;
        },
        
        // Cast as either a project or a task after
        fromFirestore(
            snapshot: QueryDocumentSnapshot, 
            options: SnapshotOptions
        ): WorkItem {
            const data = snapshot.data(options) as WorkItemDbModel;
    
            const result: WorkItem = {
                item_id: data.item_id,
                item_type: data.item_type,
    
                title: data.title,
                description: data.description,
                due_date: new Date(data.due_date),
                complete: data.complete,
                tags: data.tags
            }

            if (data.item_type === "Project") {
                result.subtasks = data.subtasks;
            }

            return result;
        }
}