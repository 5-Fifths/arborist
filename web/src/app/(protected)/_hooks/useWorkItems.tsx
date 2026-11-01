import { collection, getDocs } from "@firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { WorkItemConverter } from "@/firebase/dataConverters/WorkItemConverter";
import { db } from "@/firebase/globals";

export function useWorkItems(userRefPath: string | undefined) {
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['workItems', userRefPath],
        queryFn: async () => {
            if (!userRefPath) throw new Error("User reference path is undefined.");

            const projectsRef = collection(db, userRefPath, "projects").withConverter(WorkItemConverter);
            const tasksRef = collection(db, userRefPath, "tasks").withConverter(WorkItemConverter);

            const [projectsSnapshot, tasksSnapshot] = await Promise.all([
                getDocs(projectsRef),
                getDocs(tasksRef)
            ]);

            return {
                projects: projectsSnapshot.docs.map(doc => doc.data()),
                tasks: tasksSnapshot.docs.map(doc => doc.data())
            }
        },
        enabled: Boolean(userRefPath),
        
        // Keep in memory for an hour; User uses sync button to get latest data if they need it now
        gcTime: 1000 * 60 * 60 * 2, // 2 hours
        staleTime: 1000 * 60 * 60, // 1 hour

        // Minimize unnecessary refetches
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false
    });

    return {
        projects: data?.projects ?? [],
        tasks: data?.tasks ?? [],
        isLoading,
        isError,
        error
    }
}