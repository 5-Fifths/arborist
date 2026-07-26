import { WorkItem, TruncatedTask } from "@/types/WorkItem";
import { 
    QueryDocumentSnapshot, 
    SnapshotOptions,
    Timestamp 
} from "firebase/firestore";

interface WorkItemDbModel {
    // Identifying information
    item_id: string;
    user_id: string;

    // Item data
    title: string;
    description: string;
    due_date: Timestamp;
    complete: boolean;
    truncated_tasks: TruncatedTask[];
    tags: string[];
}

export const WorkItemConverter = {
    toFirestore(WorkItem: WorkItem): WorkItemDbModel {
            const truncatedWorkItems = WorkItem.subtasks?.map((WorkItem) => ({
                item_id: WorkItem.item_id,
                title: WorkItem.title,
                complete: WorkItem.complete
            })) ?? [];
            const tagList = WorkItem.tags ?? [];
            
            return {
                item_id: WorkItem.item_id,
                user_id: WorkItem.user_id,
    
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
                item_id: data.item_id,
                user_id: data.user_id,
    
                title: data.title,
                description: data.description,
                due_date: data.due_date.toDate(),
                complete: data.complete,
                subtasks: data.truncated_tasks,
                tags: data.tags
            }
        }
}