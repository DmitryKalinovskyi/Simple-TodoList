import { Collapse } from "antd";
import TaskList from "../../../shared/features/todo/ui/TaskList";
import useGrouptedTasks from "../hooks/useGrouptedTasks";

export default function CollapsableTasks() {
    const groupedTasks = useGrouptedTasks();

    return <>
        <Collapse ghost style={{ maxWidth: "1000px", width: "100%" }} bordered={false} items={groupedTasks.map((group) => ({
            key: group.name,
            label: group.name,
            children: <TaskList tasks={group.tasks} />
        }))} />
    </>
} 