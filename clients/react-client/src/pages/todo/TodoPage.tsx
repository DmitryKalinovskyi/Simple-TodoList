import TaskForm from "./ui/TaskForm";
import { TaskTable } from "./ui/TaskTable";
import TodoOptions from "./ui/TodoOptions";

export default function TodoPage(){
    return (
        <>
            <TodoOptions/>
            <div className="container mt-5">
                <TaskForm/>
                <TaskTable/>
            </div>
        </>
    )
}