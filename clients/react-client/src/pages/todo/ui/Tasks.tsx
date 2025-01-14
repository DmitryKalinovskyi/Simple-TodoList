import TaskList from "../../../shared/features/todo/ui/TaskList";
import useTasks from "../hooks/useTasks";

export default function Tasks() {
    const tasks = useTasks();

    return <div style={{maxWidth: "1000px", width: "100%"}}>
        <TaskList tasks={tasks} />
    </div>
} 