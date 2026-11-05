import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { debounce } from "../_util/debounce";
import { updateWorkItemDoc } from "@/lib/firebase/doc/updateWorkItemDoc";
import { useUserRefPath } from "./useUserRefPath";
import { isEqual } from "../_util/isEqual";
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

    // Delay updates until the user has idled for long enough on the input
    const debouncedMutate = useRef(
        debounce((newData: WorkItem) => {
            updateItem.mutate(newData);
        }, 1000)
    );  

    // Optimistically updates the UI and upload to db
    function debouncedUpdate(newData: WorkItem) {
        // Prevent network request from firing if the data didn't change
        if (cacheRef.current) {
            const targetArray = newData.item_type === "Project" ? cacheRef.current?.projects : cacheRef.current?.tasks;
            const referencedItem = targetArray.find((item) => item.item_id === newData.item_id);

            if (isEqual(newData, referencedItem)) {
                // Cancel any timers the background if the user didn't make a real change
                debouncedMutate.current.cancel();

                return;
            }
        }

        // Update the cache
        queryClient.setQueryData<WorkItemCache>(['workItems', userRefPath], () => {
            // Update the cache ref
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

        // Send to db
        debouncedMutate.current(newData);
    }

    return debouncedUpdate;
}