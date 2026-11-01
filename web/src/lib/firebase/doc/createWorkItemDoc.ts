import { doc, setDoc } from "firebase/firestore";

import { db } from "../globals";
import { WorkItem } from "@/types/WorkItem";
import { WorkItemConverter } from "../dataConverters/WorkItemConverter";

export async function createWorkItemDoc(userRefPath: string, item: WorkItem) {
    const targetCollection = item.item_type === "Project" ? 'projects' : 'tasks';
    const docRef = doc(db, userRefPath, targetCollection, item.item_id).withConverter(WorkItemConverter);

    await setDoc(docRef, item);
}