'use server';

import { adminDb } from "@/lib/firebase-admin/globals";
import { WorkItemConverter } from "@/lib/firebase-admin/dataConverters/WorkItemConverter";
import { WorkItem } from "@/types/WorkItem";

// Get the item to determine the value
export async function calculateItemValue(userId: string, workItem: WorkItem) {
    const BASE_VALUE = 15;

    let value = BASE_VALUE;

    const itemRef = adminDb
        .collection(`users/${userId}/${workItem.item_type.toLocaleLowerCase()}s`)
        .doc(workItem.item_id)
        .withConverter(WorkItemConverter);
    const data = (await itemRef.get()).data();

    if (!data) {
        throw new Error("Item not found.");
    }

    // Increase the value by 10 per 3 subtasks
    if (data.item_type === "Project") {
        const subtaskCount = data.subtasks ? data.subtasks.length : 0;

        value += Math.floor(subtaskCount / 3) * 10 + 5;
    }

    // Flip the sign if the item is marked complete
    if (!data.complete) {
        value *= -1;
    }

    return value;
}