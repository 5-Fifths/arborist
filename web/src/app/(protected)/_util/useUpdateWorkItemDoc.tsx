import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { debounce } from "./debounce";
import { updateWorkItemDoc } from "@/firebase/doc/updateWorkItemDoc";
import { useUserRefPath } from "./useUserRefPath";
import { WorkItem } from "@/types/WorkItem";

interface WorkItemCache {
    projects: WorkItem[],
    tasks: WorkItem[]
}

export function useUpdateWorkItemDoc() {
    const { userRefPath, error } = useUserRefPath();;
    const queryClient = useQueryClient();
    const cacheRef = useRef<WorkItemCache>(queryClient.getQueryData(['workItems', userRefPath]));

    const updateItem = useMutation({
        // Update db
        mutationFn: async (item: WorkItem) => {
            if (!userRefPath) throw error;

            await updateWorkItemDoc(userRefPath, item);
        },
        // Rollback changes
        onError: () => {
            if (cacheRef.current) 
                queryClient.setQueryData(['workItems', userRefPath], cacheRef.current);
        },
        // Invalidate cache ref
        onSettled: () => {
            cacheRef.current = undefined;
        }
    });

    const debouncedMutate = useRef(
        debounce((newData: WorkItem) => {
            updateItem.mutate(newData);
        }, 1000)
    );  

    // Optimistically updates the UI and
    function debouncedUpdate(newData: WorkItem) {
        // Optimistic update
        queryClient.setQueryData<WorkItemCache>(['workItems', userRefPath], () => {
            // If the cache is uninitialized
            if (!cacheRef.current) {
                cacheRef.current = queryClient.getQueryData(['workItems', userRefPath]);
            }               

            // Either use the existing cache or default to empty when nothing has been entered
            const cache = cacheRef.current ?? { projects: [], tasks: []};

            return {
                projects: cache.projects.map((item) => newData.item_id === item.item_id ? newData : item),
                tasks: cache.tasks.map((item) => newData.item_id === item.item_id ? newData : item),
            }
        });
        

        debouncedMutate.current(newData);
    }

    return debouncedUpdate;
}