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
            await queryClient.setQueryData<WorkItemCache>(['workItems', userRefPath], (oldCache) => {
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
            console.error(_err);
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
        },
        onSettled: (_data, _err, _vars, context) => {
            if (context?.userRefPath)
                queryClient.invalidateQueries({queryKey: ['workItems', context.userRefPath]});
        }
    });

    return createItem;
}