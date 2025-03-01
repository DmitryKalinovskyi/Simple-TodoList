import useSetting from "@/lib/shared/features/settings/hooks/useSetting";
import { onTaskCreated } from "@/lib/shared/features/todo/api/subscription/onTaskCreated";
import { onTaskDeleted } from "@/lib/shared/features/todo/api/subscription/onTaskDeleted";
import { onTaskUpdated } from "@/lib/shared/features/todo/api/subscription/onTaskUpdated";
import { useEffect } from "react";

interface SubscriptionProviderProps{
    children: JSX.Element | JSX.Element[]
}

export default function SubscriptionProvider(props: SubscriptionProviderProps){
    const [enableLiveUpdates] = useSetting("enableLiveUpdates");

    useEffect(() => {
        if(enableLiveUpdates){
            const onTaskCreatedSubcription = onTaskCreated().subscribe();
            const onTaskUpdatedSubcription = onTaskUpdated().subscribe();
            const onTaskDeletedSubcription = onTaskDeleted().subscribe();

            return () => {
                onTaskCreatedSubcription.unsubscribe();
                onTaskUpdatedSubcription.unsubscribe();
                onTaskDeletedSubcription.unsubscribe();
            }
        }
    }, [enableLiveUpdates])

    return props.children;
}