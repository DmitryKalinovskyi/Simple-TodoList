import { TodoListRootState } from "@/lib/shared/state/store";
import { useSelector } from "react-redux";
import useSetting from "../../settings/hooks/useSetting";
import Task from "@/lib/models/Task";

export default function useTasks(): Task[]{
    const tasks = useSelector((state: TodoListRootState) => state.tasks.tasks);
    const [displayCompleted] = useSetting<boolean>("displayCompleted");
    
    return tasks
    .filter(task => displayCompleted || !task.isCompleted)
    .sort((a, b) => {
        if(a.isCompleted !== b.isCompleted)
            return a.isCompleted ? 1: -1;

        // then order by deadline
        if(a.deadline && b.deadline)
            return a.deadline < b.deadline? 1: -1;

        if(a.deadline || b.deadline)
            return a.deadline? -1: 1;

        // order by name
        return a.name < b.name? 1: -1;
    })
}
