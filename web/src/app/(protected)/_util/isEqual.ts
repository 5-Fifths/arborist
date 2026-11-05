import { WorkItem } from "@/types/WorkItem";

// Compares work items for equality
export function isEqual(newData: WorkItem, oldData: WorkItem | undefined) {
    if (!oldData) return false;

    const newKeys = Object.keys(newData);
    const oldKeys = Object.keys(oldData);

    if (newKeys.length !== oldKeys.length) return false;
    
    for (let i = 0; i < newKeys.length; i++) {
        const key = newKeys[i];

        if (!oldKeys.includes(key)) return false;

        if (newData[key as keyof WorkItem] !== oldData[key as keyof WorkItem]) return false;
    }

    return true;
}