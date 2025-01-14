import { useSelector } from "react-redux";
import Task from "../../../models/Task";
import { TodoListRootState } from "../../../state/store";

export default function useTasks(): Task[]{
    const tasks = useSelector((state: TodoListRootState) => state.tasks.tasks);
    const displayCompleted = useSelector((state: TodoListRootState) => state.settings.displayCompleted);

    return tasks
    .filter((task) => {
        if(!displayCompleted && task.isCompleted){
            return false;
        }
        
        return true;
    })
    .sort((a, b) => {
        // put completed after uncompleted
        if(a.isCompleted !== b.isCompleted)
            return a.isCompleted ? 1: -1;

        // then order by deadline
        if(a.deadline && b.deadline)
            return a.deadline < b.deadline? 1: -1;

        if(a.deadline || b.deadline)
            return a.deadline? -1: 1;

        // order by name
        return a.name < b.name? 1: -1;
    });
}
