import Task from "../models/Task.ts";
import {useDispatch} from "react-redux";
import {remove_task_request, update_task_request} from "../state/epics/tasksEpics.ts";

interface TaskRowProps{
    task: Task,
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function TaskRow(props: TaskRowProps ){
    const task = props.task;
    const dispatch = useDispatch();
    const isCompleteCheckboxId = "isComplete-input-" + task.id;

    function getFormatedDeadline(deadline: string){
        const date = new Date(deadline);
        return date.toUTCString();
    }

    function toggleTodo(){
        dispatch(update_task_request(
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
                        className="mx-2"/>
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
                    {task.deadline && getFormatedDeadline(task.deadline)}
                </div>
            </td>

            <td>
                <button className="btn btn-danger" onClick={() => dispatch(remove_task_request(task.id))}>
                    X
                </button>
            </td>
        </tr>
    )
}