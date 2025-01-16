import TaskList from "@/shared/features/todo/ui/TaskList";
import { TodoListRootState } from "@/state/store";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function Tasks() {
    const tasks = useSelector((state: TodoListRootState) => state.tasks.tasks);
    return <TaskList tasks={tasks}/>
}