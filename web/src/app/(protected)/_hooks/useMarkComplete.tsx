import { useContext } from "react";
import { useUpdateWorkItemDoc } from "./useUpdateWorkItemDoc";
import { updateBalance } from "@/lib/firebase-admin/doc/updateBalance";
import { AuthContext } from "@/providers/AuthProvider";
import { WorkItem } from "@/types/WorkItem";

// Handler for handling work item completion
export function useMarkComplete() {
    const { user, loading } = useContext(AuthContext);
    
    const debouncedUpdate = useUpdateWorkItemDoc();

    const onComplete = (workItem: WorkItem) => {
        if (!user || loading) return;

        const updatedWorkItem: WorkItem = {
            ...workItem,
            complete: !workItem.complete
        }

        debouncedUpdate(updatedWorkItem);
        updateBalance(user.uid, updatedWorkItem);
    }

    return onComplete;
}   