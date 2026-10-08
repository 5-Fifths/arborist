import { doc, setDoc } from "firebase/firestore";

import { WorkItem } from "@/types/WorkItem";
import { db } from "../globals";

export async function updateWorkItemDoc(userRefPath: string, data: WorkItem) {    
    const ref = doc(db, userRefPath, data.item_type, data.item_id);

    await setDoc(ref, {...data}, {merge: true});
}