import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateWorkItemDoc } from "@/firebase/doc/updateWorkItemDoc";
import { useUserRefPath } from "./useUserRefPath";
import { WorkItem } from "@/types/WorkItem";

interface WorkItemCache {
    projects: WorkItem[],
    tasks: WorkItem[]
}

export function useUpdateWorkItem() {
    const { userRefPath, error } = useUserRefPath();
    const queryClient = useQueryClient();

    const updateItem = useMutation({
        mutationFn: async (item: WorkItem) => {
            if (!userRefPath) throw error;

            await updateWorkItemDoc(userRefPath, item);
        },
        onMutate: async (newData: WorkItem) => {
            // Cancel outgoing requests
            await queryClient.cancelQueries({queryKey: ['workItems', userRefPath]});

            // Save current data
            const prevCache: WorkItemCache | undefined = queryClient.getQueryData(['workItems', userRefPath]);

            // Update items
            queryClient.setQueryData<WorkItemCache>(['workItems', userRefPath], (oldCache) => {
                // If the cache is uninitialized
                if (!oldCache) {
                    return { 
                        projects: [],
                        tasks: []
                    };
                }               

               return {
                    ...oldCache,
                    projects: oldCache.projects.map((item) => newData.item_id === item.item_id ? newData : item),
                    tasks: oldCache.tasks.map((item) => newData.item_id === item.item_id ? newData : item),
               }
            });

            // Context
            return { prevCache, userRefPath };
        },
        onError: (_err, _newItem, context) => {
            if (context?.prevCache) 
                queryClient.setQueryData(['workItems', userRefPath], context.prevCache);
        },
        onSettled: (_data, _err, _vars, context) => {
            if (context)
                queryClient.invalidateQueries({queryKey: ['workItems', context.userRefPath]});
        }
    });

    return updateItem;
}