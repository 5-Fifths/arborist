import { doc, setDoc } from "firebase/firestore";

import { WorkItemConverter } from "../dataConverters/WorkItemConverter";
import { WorkItem } from "@/types/WorkItem";
import { db } from "../globals";


export async function updateWorkItemDoc(userRefPath: string, data: WorkItem) { 
    const collectionName = data.item_type === "Project" ? 'projects' : 'tasks';
    
    const ref = doc(db, userRefPath, collectionName, data.item_id).withConverter(WorkItemConverter);

    await setDoc(ref, {...data}, {merge: true});
}