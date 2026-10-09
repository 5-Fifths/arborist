import { doc, setDoc } from "firebase/firestore";

import { WorkItem } from "@/types/WorkItem";
import { db } from "../globals";

export async function updateWorkItemDoc(userRefPath: string, data: WorkItem) { 
    const collectionName = data.item_type === "Project" ? 'projects' : 'tasks';
    
    const ref = doc(db, userRefPath, collectionName, data.item_id);

    await setDoc(ref, {...data}, {merge: true});
}