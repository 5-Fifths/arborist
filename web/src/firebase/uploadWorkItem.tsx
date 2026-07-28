import { db } from "./globals";
import { doc, setDoc } from "firebase/firestore";
import { WorkItemConverter } from "./dataConverters/WorkItemConverter";
import { WorkItem } from "@/types/WorkItem";
import { User } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export async function uploadWorkItem(user: User, workItem: WorkItem) {
    const collectionName = workItem.item_type === "Task" ? "tasks" : "projects"
    const docRef = doc(db, user.uid, collectionName, workItem.item_id);

    try {
        await setDoc(docRef.withConverter(WorkItemConverter), workItem);

        return {
            success: true,
            result: `${workItem.item_type} uploaded successfully.`
        }
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                error: (error as {code: string}).code
            }
        }

        return {
            success: false,
            result: error
        }
    }
}