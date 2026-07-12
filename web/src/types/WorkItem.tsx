export interface WorkItem {
    // Identifying information
    item_id: string;
    user_id: string;

    // Item data
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