'use server';

import { adminDb } from "@/lib/firebase-admin/globals";
import { WorkItem } from "@/types/WorkItem";

// Get the item to determine the value
export async function calculateItemValue(workItem: WorkItem) {
    const TASK_VALUE = 15

    const itemRef = adminDb.collection(`users/${workItem.item_type.toLocaleUpperCase()}s`).doc(workItem.item_id);
    const snapshot = await itemRef.get();

    if (!snapshot.exists) {
        throw new Error("User not found.");
    }

    if 
}