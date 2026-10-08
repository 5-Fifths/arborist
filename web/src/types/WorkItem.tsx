export type ItemType = "Project" | "Task";

export interface WorkItem {
    // Identifying information
    item_id: string;

    // Item data
    item_type: ItemType;
    title: string;
    description: string;
    due_date: Date;
    complete: boolean;
    subtasks?: TruncatedTask[];
    tags?: string[];
}

export interface TruncatedTask {
    item_id: string,
    title: string,
    complete: boolean
}

export interface Task extends WorkItem {}
export interface Project extends WorkItem {}