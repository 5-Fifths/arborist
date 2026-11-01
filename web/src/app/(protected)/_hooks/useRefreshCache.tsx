import { useQueryClient } from "@tanstack/react-query";
import { useState, } from "react";

import { useUserRefPath } from "./useUserRefPath";

export function useRefreshCache() {
    const queryClient = useQueryClient();
    const { userRefPath } = useUserRefPath();
    const [isCooldown, setIsCooldown] = useState(false);
    
    const refreshCache = async () => {
        if (isCooldown) return;

        await queryClient.invalidateQueries({queryKey: ['workItems', userRefPath]});

        setIsCooldown(true);
        setTimeout(() => {
            setIsCooldown(false);
        }, 10 * 1000); // Cooldown for 10 seconds
    }

    return { refreshCache, isCooldown };
}