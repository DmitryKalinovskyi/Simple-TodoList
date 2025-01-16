import { useSelector } from "react-redux";
import Task from "../../../models/Task";
import { TodoListRootState } from "../../../state/store";
import dayjs from "dayjs";
import useSetting from "../../../shared/features/settings/hooks/useSetting";

interface TaskGroup{
    name: string,
    tasks: Task[],
}

export default function useGrouptedTasks(): TaskGroup[]{
    const tasks = useSelector((state: TodoListRootState) => state.tasks.tasks);
    const [displayCompleted] = useSetting<boolean>("displayCompleted");

    const overdued: Task[] = [];
    const withoutDeadline: Task[] = [];
    const completed: Task[] = [];
    
    const dateFormat = "DD MMM dddd YYYY";
    const groupedByDate = new Map<number, Task[]>();

    tasks.forEach((task) => {
        if(task.isCompleted){
            completed.push(task);
        }
        else if(!task.deadline){
            withoutDeadline.push(task);
        }
        else if(Date.now() > new Date(task.deadline).getTime()){
            overdued.push(task)
        }
        else{
            // const dayTag: string = dayjs(task.deadline).format(dateFormat)
            const dayIdentifier = dayjs(task.deadline).startOf("day").unix();

            if(!groupedByDate.has(dayIdentifier)){
                groupedByDate.set(dayIdentifier, []);
            }
            
            // Use `get` to retrieve the array reference and push to it
            groupedByDate.get(dayIdentifier)?.push(task);
            // groupedByDate.set(dayTag, [...(groupedByDate.get(dayTag) ?? []), task]);
        }
    })

    const dayGroups: TaskGroup[] = Array.from(groupedByDate.entries())
    .sort(([a], [b]) => a > b ? 1 : -1)
    .map(([dayIdentifier, tasks]) => ({name: dayjs.unix(dayIdentifier).format(dateFormat), tasks}));

    const result = [
        ...(overdued.length > 0? [{name: "Overdued", tasks: overdued}]: []),
        ...(withoutDeadline.length > 0 ? [{name: "Without deadline", tasks: withoutDeadline}] : []),
        ...(displayCompleted && completed.length > 0? [{ name: "Completed", tasks: completed }] : []),
        ...dayGroups,
    ];

    return result;
}
