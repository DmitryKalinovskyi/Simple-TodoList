import Task from "../../../models/Task.ts";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { deleteTask, updateTask } from "../state/tasksSlice.ts";

interface TaskRowProps {
    task: Task,
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function TaskRow(props: TaskRowProps) {
    const task = props.task;
    const dispatch = useDispatch();
    const isCompleteCheckboxId = "isComplete-input-" + task.id;

    function toggleTodo() {
        dispatch(updateTask(
            {
                id: task.id,
                task: {
                    isCompleted: !task.isCompleted
                }
            }));
    }

    return (
        <tr>
            <td>
                <form method="post" className="d-flex align-items-center">
                    <input
                        name="isCompleted"
                        type="checkbox"
                        id={isCompleteCheckboxId}
                        checked={task.isCompleted}
                        onChange={toggleTodo}
                        className="mx-2" />
                    <label htmlFor={isCompleteCheckboxId}>
                        {task.isCompleted ? <s>{task.name}</s> : <>{task.name}</>}
                    </label>
                </form>
            </td>
            <td>
                <div className="badge mx-2 bg-primary">
                    {task.category?.name}
                </div>
            </td>

            <td>
                <div className="badge bg-secondary">
                    {task.deadline && dayjs(task.deadline).format("MMMM D, YYYY h:mm A")}
                </div>
            </td>

            <td>
                <button className="btn btn-danger" onClick={() => dispatch(deleteTask(task.id))}>
                    X
                </button>
            </td>
        </tr>
    )
}