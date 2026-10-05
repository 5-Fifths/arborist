import { WorkItem, TruncatedTask } from "@/types/WorkItem";
import { 
    QueryDocumentSnapshot, 
    SnapshotOptions,
    Timestamp 
} from "firebase/firestore";

interface WorkItemDbModel {
    // Identifying information
    item_type: "Project" | "Task",

    // Item data
    title: string,
    description: string,
    due_date: Timestamp,
    complete: boolean,
    truncated_tasks: TruncatedTask[],
    tags: string[]
}

export const WorkItemConverter = {
    toFirestore(WorkItem: WorkItem): WorkItemDbModel {
            const tagList = WorkItem.tags ?? [];
            const truncatedWorkItems = WorkItem.subtasks?.map((subtask) => ({
                item_id: subtask.item_id,
                title: subtask.title,
                complete: subtask.complete
            })) ?? [];
            
            return {
                item_type: WorkItem.item_type,
    
                title: WorkItem.title,
                description: WorkItem.description,
                due_date: Timestamp.fromDate(WorkItem.due_date),
                complete: WorkItem.complete,
                truncated_tasks: truncatedWorkItems,
                tags: tagList
            }
        },
        
        // Cast as either a project or a task after
        fromFirestore(
            snapshot: QueryDocumentSnapshot, 
            options: SnapshotOptions
        ): WorkItem {
            const data = snapshot.data(options) as WorkItemDbModel;
    
            return {
                item_id: snapshot.id,
                item_type: data.item_type,
    
                title: data.title,
                description: data.description,
                due_date: data.due_date?.toDate() ?? new Date(),
                complete: data.complete,
                subtasks: data.truncated_tasks,
                tags: data.tags
            }
        }
}