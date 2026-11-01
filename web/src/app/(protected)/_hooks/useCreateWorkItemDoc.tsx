import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createWorkItemDoc } from "@/firebase/doc/createWorkItemDoc";
import { useUserRefPath } from "./useUserRefPath";
import { WorkItem } from "@/types/WorkItem";

interface WorkItemCache {
    projects: WorkItem[],
    tasks: WorkItem[]
}

export function useCreateWorkItemDoc() {
    const { userRefPath, error } = useUserRefPath();
    const queryClient = useQueryClient();

    const createItem = useMutation({
        mutationFn: async (newItem: WorkItem) => {
            if (error !== null) throw error;
            if (!userRefPath) throw new Error("User reference path is not defined.");

            await createWorkItemDoc(userRefPath, newItem);
        },
        onMutate: async (newItem: WorkItem) => {
            // Cancel outgoing requests
            await queryClient.cancelQueries({queryKey: ['workItems', userRefPath]});

            // Save cache
            const oldCache = queryClient.getQueryData<WorkItemCache>(['workItems', userRefPath]);

            // Add item to cache
            queryClient.setQueryData<WorkItemCache>(['workItems', userRefPath], (oldCache) => {
                const isProject = newItem.item_type === "Project";

                if (!oldCache) {
                    return {
                        projects: isProject ? [newItem] : [],
                        tasks: isProject ? [] : [newItem]
                    }
                }

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

            return { oldCache, userRefPath };
        },
        onError: (_err, _data, context) => {
            if (!context?.userRefPath) return;

            if (context?.oldCache)
                queryClient.setQueryData(['workItems', context.userRefPath], context.oldCache);
            else
                queryClient.setQueryData(
                    ['workItems', context.userRefPath], 
                    {
                        projects: [],
                        tasks: []
                    }
            )
        }
    });

    return createItem;
}