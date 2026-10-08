import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkItemDoc } from "@/firebase/doc/createWorkItemDoc";
import { useUserRefPath } from "./useUserRefPath";
import { WorkItem } from "@/types/WorkItem";

interface WorkItemCache {
    projects: WorkItem[],
    tasks: WorkItem[]
}

export function useCreateWorkItem() {
    const { userRefPath, error } = useUserRefPath();
    const queryClient = useQueryClient();

    const createItem = useMutation({
        mutationFn: async (newItem: WorkItem) => {
            if (!userRefPath) throw error;

            await createWorkItemDoc(userRefPath, newItem);
        },
        onMutate: async (newItem: WorkItem) => {
            // Cancel outgoing requests
            await queryClient.cancelQueries({queryKey: ['workItems', userRefPath]});

            // Save cache
            const oldCache = queryClient.getQueryData<WorkItemCache>(['workItems', userRefPath]);

            // Add item to cache
            await queryClient.setQueryData<WorkItemCache>(['workItems', userRefPath], (oldCache) => {
                if (!oldCache) {
                    return {
                        projects: [],
                        tasks: []
                    }
                }

                const isProject = newItem.item_type === "Project";
                const targetArray = isProject ? oldCache.projects : oldCache.tasks;
                const newArray = [...targetArray, newItem];
                
                if (isProject) {
                    return {
                        ...oldCache,
                        projects: newArray
                    }
                }

                return {
                    ...oldCache,
                    tasks: newArray
                }
            })

            return { oldCache };
        },
        onError: (_err, _data, context) => {
            if (context?.oldCache)
                queryClient.setQueryData(['workItems', userRefPath], context.oldCache);
        },
        onSettled: (_data, _err, _vars, context) => {
            if (context)
                queryClient.invalidateQueries({queryKey: ['workItems', userRefPath]});
        }
    });

    return createItem;
}